
using Microsoft.AspNetCore.Identity;

namespace Entities.Exceptions
{
    public abstract class BadRequestException : Exception
    {
        protected BadRequestException(string message) : base(message)
        {

        }

        // protected BadRequestException(string errorCode, List<IdentityError> errorList) : base(errorCode)
        // {

        // }
    }


}