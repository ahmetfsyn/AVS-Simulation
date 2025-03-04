using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities.Dtos;
using Entities.Models;

namespace Services.Contracts
{
    public interface ICityHallService
    {
        IEnumerable<CityHall> GetAllCityHalls(bool trackChanges);
        CityHall GetCityHallById(int id, bool trackChanges);
        CityHall CreateCityHall(CityHall cityHall);
        void DeleteCityHall(int id, bool trackChanges);
    }
}