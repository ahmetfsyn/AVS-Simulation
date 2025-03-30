using System;
using System.Net;
using Entities.ErrorModel;
using Entities.Exceptions;
using Microsoft.AspNetCore.Diagnostics;
using Services.Contracts;

namespace backend.Extensions;

public static class ExceptionMiddlewareExtensions
{
    //     Bu sınıf, ASP.NET Core uygulamanızda **global hata işleme** (exception handling) sağlar. Uygulamanın herhangi bir yerinde bir hata oluştuğunda, bu middleware hatayı yakalar ve düzgün bir JSON yanıtı ile kullanıcıya bildirir.

    // - Eğer bir **NotFoundException** (bulunamadı hatası) oluşursa, 404 HTTP statü kodu döner.
    // - Diğer tüm hatalar için, 500 Internal Server Error statüsü döner.
    // - Hatalar, **`ILoggerService`** kullanılarak loglanır ve hata mesajları **`ErrorDetails`** formatında JSON olarak kullanıcıya iletilir.

    // Bu yapı, merkezi bir hata işleme mekanizması oluşturur, böylece tüm hatalar tek bir yerde yönetilebilir.
    public static void ConfigureExceptionHandler(this WebApplication app,
        ILoggerService logger)
    {

        app.UseExceptionHandler(
            appError =>
            {
                appError.Run(async (context) =>
                {
                    context.Response.ContentType = "application/json";
                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();

                    if (contextFeature is not null)
                    {

                        context.Response.StatusCode = contextFeature.Error switch
                        {
                            NotFoundException => StatusCodes.Status404NotFound,
                            _ => StatusCodes.Status500InternalServerError
                        };

                        logger.LogError($"Something went wrong: {contextFeature.Error}");
                        await context.Response.WriteAsync(new ErrorDetails()
                        {
                            StatusCode = context.Response.StatusCode,
                            Details = contextFeature.Error.Message
                        }.ToString());
                    }

                });
            }
        );
    }
}
