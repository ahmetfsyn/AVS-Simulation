using Entities.Dtos;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using Presentation.ActionFilters;
using Repositories.Contracts;
using Repositories.EFCore;
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
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builer =>
                    builer.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().WithExposedHeaders("X-Pagination")
                    );
            });
        }

        public static void ConfigureDataShaper(this IServiceCollection services)
        {
            services.AddScoped<IDataShaper<UserDto>, DataShaper<UserDto>>();
            services.AddScoped<IDataShaper<CityHallDto>, DataShaper<CityHallDto>>();
            services.AddScoped<IDataShaper<WaterCardDto>, DataShaper<WaterCardDto>>();

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

            });
        }
    }
}