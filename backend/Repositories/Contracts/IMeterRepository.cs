using Entities.Models;
using Entities.RequestFeatures;

namespace Repositories.Contracts
{
    public interface IMeterRepository : IRepositoryBase<Meter>
    {
        Task<PagedList<Meter>> GetAllMetersAsync(MeterParameters meterParameters, bool trackChanges);

    }
}