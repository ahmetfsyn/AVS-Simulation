using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities.Models;
using Entities.RequestFeatures;

namespace Repositories.Contracts
{
    public interface ICityHallRepository : IRepositoryBase<CityHall>
    {
        Task<PagedList<CityHall>> GetAllCityHallsAsync(CityHallParameters cityHallParameters, bool trackChanges);
        Task<CityHall> GetCityHallByIdAsync(int id, bool trackChanges);
        void CreateCityHall(CityHall cityHall);
        void DeleteCityHall(CityHall cityHall);
        // ! void UpdateCityHall(CityHall cityHall); bu method kullanılmaycak çünkü gerek yok

    }
}