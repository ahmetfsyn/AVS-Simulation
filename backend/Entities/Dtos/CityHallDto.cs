using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Entities.Dtos
{
    public record CityHallDto
    {
        public int Id { get; set; }
        public string City { get; set; }
        public string CityHallName { get; set; }

    }
}