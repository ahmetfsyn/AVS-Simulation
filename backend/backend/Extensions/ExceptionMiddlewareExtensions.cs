using System;
using System.Net;
using Entities.ErrorModel;
using Entities.Exceptions;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Identity;
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

                        var error = contextFeature.Error;
                        var errorCode = "UNKNOWN_ERROR";  // Varsayılan hata kodu
                        List<IdentityError> errorList = null;


                        switch (error)
                        {
                            case RegistrationFailedException registrationError:
                                context.Response.StatusCode = StatusCodes.Status409Conflict;
                                errorCode = registrationError.ErrorCode.ToString();
                                errorList = registrationError.ErrorList;
                                break;

                            case NotFoundException notFoundError:
                                context.Response.StatusCode = StatusCodes.Status404NotFound;
                                errorCode = "NOT_FOUND";
                                break;

                            default:
                                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                                errorCode = "INTERNAL_SERVER_ERROR";
                                break;
                        }

                        logger.LogError($"Something went wrong: {contextFeature.Error}");
                        await context.Response.WriteAsync(new ErrorDetails()
                        {
                            StatusCode = context.Response.StatusCode,
                            Details = contextFeature.Error.Message,
                            ErrorCode = errorCode,
                            ErrorList = errorList
                        }.ToString());
                    }

                });
            }
        );
    }
}
