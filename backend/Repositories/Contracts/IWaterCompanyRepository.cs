
using Entities.Models;

namespace Repositories.Contracts
{
    public interface IWaterCompanyRepository : IRepositoryBase<WaterCompany>
    {
        Task<IEnumerable<WaterCompany>> GetWaterCompaniesAsync(bool trackChanges);

    }
}