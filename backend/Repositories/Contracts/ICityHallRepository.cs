
using Entities.Models;

namespace Repositories.Contracts
{
    public interface ICityHallRepository : IRepositoryBase<CityHall>
    {
        Task<CityHall> GetCityHallByIdAsync(string id, bool trackChanges);
    }
}