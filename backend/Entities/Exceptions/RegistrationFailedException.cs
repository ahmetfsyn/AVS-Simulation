
using Microsoft.AspNetCore.Identity;

namespace Entities.Exceptions
{
    public class RegistrationFailedException : BadRequestException
    {
        public string ErrorCode { get; }
        public List<IdentityError> ErrorList { get; }
        public RegistrationFailedException(string errorCode, List<IdentityError> errorList) : base(errorCode)
        {
            ErrorList = errorList;
            ErrorCode = errorCode;
        }


    }
}