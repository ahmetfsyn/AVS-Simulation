
using Entities.Dtos;

namespace Services.Contracts
{
    public interface ICityHallService
    {
        Task<CityHallDto> GetCityHallByIdAsync(string id, bool trackChanges);

    }
}