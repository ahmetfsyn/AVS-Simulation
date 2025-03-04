using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities.Models;

namespace Repositories.Contracts
{
    public interface ICityHallRepository : IRepositoryBase<CityHall>
    {
        public IQueryable<CityHall> GetAllCityHalls(bool trackChanges);
        CityHall GetCityHallById(int id, bool trackChanges);
        void CreateCityHall(CityHall cityHall);
        void DeleteCityHall(CityHall cityHall);
        // ! void UpdateCityHall(CityHall cityHall); bu method kullanılmaycak çünkü gerek yok

    }
}