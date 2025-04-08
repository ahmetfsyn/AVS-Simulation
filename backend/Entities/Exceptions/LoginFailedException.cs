
using Microsoft.AspNetCore.Identity;

namespace Entities.Exceptions
{
    public class LoginFailedException : BadRequestException
    {
        public string ErrorCode { get; }
        public List<IdentityError> ErrorList { get; }

        public LoginFailedException(string errorCode, List<IdentityError> errorList) : base(errorCode)
        {
            ErrorList = errorList;
            ErrorCode = errorCode;
        }

    }
}