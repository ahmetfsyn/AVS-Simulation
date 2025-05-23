using System.Text;
using AspNetCoreRateLimit;
using Entities.Dtos;
using Entities.Models;
using Marvin.Cache.Headers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Presentation.ActionFilters;
using Repositories;
using Repositories.Contracts;
using Repositories.EFCore;
using Repositories.EFCore.Extensions;
using Services;
using Services.Contracts;

namespace backend.Extensions
{

    // Bu extension sınıfı, Dependency Injection aracılığıyla çeşitli servisleri (veritabanı bağlantısı, repository, service, logging) yapılandırır ve uygulamanın farklı bölümlerinde kullanılabilir hale getirir. Bu sayede:
    // Veritabanı erişimi için RepositoryContext eklenir.
    // Veri erişim yönetimi için IRepositoryManager ve RepositoryManager eklenir.
    // İş mantığı yönetimi için IServiceManager ve ServiceManager eklenir.
    // Loglama işlemleri için ILoggerService ve LoggerManager eklenir.
    // Bu yapı, uygulamanın servislerini merkezi bir yerden yönetmek ve DI (Dependency Injection) mekanizması ile bağımlılıklarını enjekte etmek için oldukça kullanışlıdır.


    public static class ServicesExtensions
    {

        public static void ConfigureSqlContext(this IServiceCollection services, IConfiguration configuration) =>
         services.AddDbContext<RepositoryContext>(options => options.UseNpgsql(configuration.GetConnectionString("sqlConnection")));


        public static void ConfigureRepositoryManager(this IServiceCollection services) =>
        services.AddScoped<IRepositoryManager, RepositoryManager>();


        public static void ConfigureServiceManager(this IServiceCollection services) =>
        services.AddScoped<IServiceManager, ServiceManager>();

        public static void ConfigureLoggerService(this IServiceCollection services) =>
        services.AddSingleton<ILoggerService, LoggerManager>();

        public static void ConfigureActionFilters(this IServiceCollection services)
        {
            services.AddScoped<ValidationFilterAttribute>();
            services.AddSingleton<LogFilterAttribute>();
            services.AddScoped<ValidateMediaTypeAttribute>();
        }

        public static void ConfigureCors(this IServiceCollection services)
        {
            // services.AddCors(options =>
            // {
            //     options.AddPolicy("CorsPolicy", builer =>
            //         builer
            //         .AllowAnyOrigin()
            //         .AllowAnyMethod()
            //         .AllowAnyHeader()
            //         .AllowCredentials()
            //         .WithExposedHeaders("X-Pagination")
            //         );
            // });

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
               builder.WithOrigins("http://localhost:5173", "https://your-ngrok-url.ngrok-free.app")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials() // Kimlik doğrulama ve yetkilendirme gereksinimleri varsa
              .WithExposedHeaders("X-Pagination"));
            });
        }

        public static void ConfigureDataShaper(this IServiceCollection services)
        {
            services.AddScoped<IDataShaper<UserDto>, DataShaper<UserDto>>();
            services.AddScoped<IDataShaper<MeterDto>, DataShaper<MeterDto>>();

        }

        public static void AddCustomMediaTypes(this IServiceCollection services)
        {
            services.Configure<MvcOptions>(config =>
            {
                var systemTextJsonOutputFormatter = config.OutputFormatters.OfType<SystemTextJsonOutputFormatter>()?.FirstOrDefault();

                if (systemTextJsonOutputFormatter is not null)
                {
                    systemTextJsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.ahmetfsyn.hateoas+json");

                    systemTextJsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.ahmetfsyn.apiroot+json");
                }
                var xmlOutputFormatter = config.OutputFormatters.OfType<XmlDataContractSerializerOutputFormatter>()?.FirstOrDefault();


                if (xmlOutputFormatter is not null)
                {
                    xmlOutputFormatter.SupportedMediaTypes.Add("application/vnd.ahmetfsyn.hateoas+xml");
                    xmlOutputFormatter.SupportedMediaTypes.Add("application/vnd.ahmetfsyn.apiroot+xml");

                }
            });
        }
        public static void ConfigureVersioning(this IServiceCollection services)
        {
            services.AddApiVersioning(options =>
            {
                options.ReportApiVersions = true;
                options.AssumeDefaultVersionWhenUnspecified = true;
                options.DefaultApiVersion = new ApiVersion(1, 0);

                options.ApiVersionReader = new HeaderApiVersionReader("api-version");

            });
        }

        public static void ConfigureResponseCaching(this IServiceCollection services)
        {
            services.AddResponseCaching();
        }

        public static void ConfigureHttpCacheHeaders(this IServiceCollection services)
        {
            services.AddHttpCacheHeaders(expirationOptions =>
            {
                expirationOptions.MaxAge = 300;
                expirationOptions.CacheLocation = CacheLocation.Public;
            }, validationOptions =>
            {
                validationOptions.MustRevalidate = true;
            });
        }

        public static void ConfigureRateLimitingOptions(this IServiceCollection services)
        {
            var rateLimitRules = new List<RateLimitRule>()
            {
                new() {
                Endpoint = "*",
                Limit = 30,
                Period = "1m"
                }
            };

            services.Configure<IpRateLimitOptions>(options =>
            {
                options.GeneralRules = rateLimitRules;
            });

            services.AddSingleton<IRateLimitCounterStore, MemoryCacheRateLimitCounterStore>();
            services.AddSingleton<IIpPolicyStore, MemoryCacheIpPolicyStore>();
            services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();
            services.AddSingleton<IProcessingStrategy, AsyncKeyLockProcessingStrategy>();
        }

        public static void ConfigureIdentity(this IServiceCollection services)
        {
            var builder = services.AddIdentity<User, IdentityRole>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.User.RequireUniqueEmail = false;
                options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_@.";
                // options.User.AllowedUserNameCharacters = null;
                // options.Password.RequiredLength = 6;
            })
            .AddEntityFrameworkStores<RepositoryContext>()
            .AddDefaultTokenProviders();
            // .AddUserValidator<CustomUserValidator>();
        }

        public static void ConfigureJWT(this IServiceCollection services, IConfiguration configuration)
        {
            var jwtSettings = configuration.GetSection("JWTSettings");
            var secretKey = jwtSettings["secretKey"];

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings["validIssuer"],
                    ValidAudience = jwtSettings["validAudience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
                };
            });
        }

        public static void RegisterRepositories(this IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IWaterCardRepository, WaterCardRepository>();
            services.AddScoped<IMeterRepository, MeterRepository>();
            services.AddScoped<IWaterCompanyRepository, WaterCompanyRepository>();
            services.AddScoped<ICityHallRepository, CityHallRepository>();
            services.AddScoped<IKioskRepository, KioskRepository>();





        }

        public static void RegisterServices(this IServiceCollection services)
        {
            services.AddScoped<IUserService, UserManager>();
            services.AddScoped<IWaterCardService, WaterCardManager>();
            services.AddScoped<IMeterService, MeterManager>();
            services.AddScoped<IWaterCompanyService, WaterCompanyManager>();
            services.AddScoped<IAuthenticationService, AuthenticationManager>();
            services.AddScoped<ICityHallService, CityHallManager>();
            services.AddScoped<IKioskService, KioskManager>();



        }

        public static void ConfigureSignalR(this IServiceCollection services)
        {
            services.AddSignalR();
        }

    }
}