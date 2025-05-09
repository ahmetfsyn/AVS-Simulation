using AspNetCoreRateLimit;
using backend.Extensions;
using Microsoft.AspNetCore.Mvc;
using NLog;
using Services;
using Services.Contracts;
using SignalR;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://0.0.0.0:7154");

// API uç noktalarını keşfetmek için gerekli servisi ekler
builder.Services.AddEndpointsApiExplorer();
// Swagger'ı ekler, API'yi otomatik olarak dökümante eder
builder.Services.AddSwaggerGen();
// Veritabanı bağlantılarını yapılandırır
builder.Services.ConfigureSqlContext(builder.Configuration);
// RepositoryManager servislerini ekler (veri erişimi)
builder.Services.ConfigureRepositoryManager();
// ServiceManager servislerini ekler (iş mantığı)
builder.Services.ConfigureServiceManager();
// Loglama servisini yapılandırır (NLog kullanılarak)
builder.Services.ConfigureLoggerService();
// AutoMapper'ı ekler, nesne dönüşümleri için yapılandırma sağlar
builder.Services.AddAutoMapper(typeof(Program));

builder.Services.ConfigureActionFilters();

builder.Services.ConfigureCors();

builder.Services.ConfigureDataShaper();

builder.Services.AddScoped<IUserLinks, UserLinks>();
builder.Services.AddScoped<IMeterLinks, MeterLinks>();

builder.Services.ConfigureVersioning();

builder.Services.ConfigureResponseCaching();

builder.Services.ConfigureHttpCacheHeaders();

builder.Services.AddMemoryCache();

builder.Services.ConfigureRateLimitingOptions();

builder.Services.AddHttpContextAccessor();

builder.Services.ConfigureIdentity();

builder.Services.ConfigureJWT(builder.Configuration);

builder.Services.RegisterRepositories();

builder.Services.RegisterServices();

builder.Services.AddSignalR();



// NLog yapılandırmasını yükler, log dosyasını ve yapılandırmayı okur
LogManager.LoadConfiguration(string.Concat(Directory.GetCurrentDirectory(), "/nlog.config"));

// Controller'ları ekler ve Newtonsoft.Json ile JSON serileştirme sağlar
builder.Services.AddControllers(config =>
{
    config.RespectBrowserAcceptHeader = true;
    config.ReturnHttpNotAcceptable = true;
    config.CacheProfiles.Add("5mins", new CacheProfile() { Duration = 300 });
})
.AddXmlDataContractSerializerFormatters()
.AddCustomCsvFormatter()
.AddApplicationPart(typeof(Presentation.AssemblyReference).Assembly) // Başka bir assembly'den controller'lar ekler
.AddNewtonsoftJson(opt =>
{

    opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
    opt.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;
    opt.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver();

}
);

builder.Services.AddCustomMediaTypes();

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});

var app = builder.Build();


// LoggerService'i alır, hata yönetim middleware'ını yapılandırır
var logger = app.Services.GetRequiredService<ILoggerService>();
app.ConfigureExceptionHandler(logger);

// Geliştirme ortamında Swagger UI'yı gösterir
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Prodüksiyon ortamında HTTP Strict Transport Security (HSTS) aktif eder
if (app.Environment.IsProduction())
{
    app.UseHsts();
}

// HTTP'yi HTTPS'ye yönlendirir, güvenli bağlantı sağlar
// app.UseHttpsRedirection();

app.UseIpRateLimiting();

app.UseCors("CorsPolicy");

app.UseResponseCaching();

app.UseHttpCacheHeaders();

app.UseAuthentication();

app.UseAuthorization(); // Kullanıcı yetkilendirmesini aktif eder

app.MapControllers(); // Controller'ları eşler (API yolları ile eşleşmesini sağlar)

app.MapHub<HubSignalR>("/hub-signalr");

app.Run(); // Uygulamayı başlatır ve gelen istekleri işlemeye başlar
