using Entities.Dtos;
using Entities.LinkModels;
using Entities.RequestFeatures;

namespace Services.Contracts
{
    public interface ICityHallService
    {

        Task<(LinkResponse linkResponse, MetaData metaData)> GetAllCityHallsAsync(LinkParameters linkParameters, bool trackChanges);
        Task<CityHallDto> GetCityHallByIdAsync(int id, bool trackChanges);
        Task<CityHallDto> CreateCityHallAsync(CityHallDtoForInsertion cityHallDtoForInsertion);
        Task DeleteCityHallAsync(int id, bool trackChanges);


    }
}