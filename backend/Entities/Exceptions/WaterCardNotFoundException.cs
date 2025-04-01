using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Entities.Exceptions
{
    public class WaterCardNotFoundException : NotFoundException
    {
        public WaterCardNotFoundException(string id) : base($"The water card with id : {id} could not found.")
        {
        }
    }
}