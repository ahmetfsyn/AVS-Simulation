using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Entities.Exceptions
{
    public class CityLengthOutOfRange : BadRequestException
    {

        public CityLengthOutOfRange() : base("City field must contain min 2 and max 50 characters")
        {
        }
    }
}
