

using Entities.Dtos;

namespace Services.Contracts
{
    public interface IWaterCompanyService
    {
        Task<IEnumerable<WaterCompanyDto>> GetWaterCompaniesAsync(bool trackChanges);

    }


}