using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Entities.RequestFeatures
{
    public class CityHallParameters : RequestParameters
    {
        public string CityName { get; set; }
        public string CityHallName { get; set; }
        public bool ValidCityName => string.IsNullOrEmpty(CityName) || (CityName.Length >= 2 && CityName.Length <= 50);

        public string? SearchTerm { get; set; }
        // public bool ValidLastName { get; set; } = false;

        public CityHallParameters()
        {
            OrderBy = "id";
        }

    }
}