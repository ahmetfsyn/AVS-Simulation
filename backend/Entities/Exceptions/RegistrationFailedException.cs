using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Entities.Exceptions
{
    public class RegistrationFailedException : BadRequestException
    {
        public RegistrationFailedException(string message) : base(message)
        {

        }
    }
}