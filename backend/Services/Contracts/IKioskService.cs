
using Entities.Dtos;

namespace Services.Contracts
{
    public interface IKioskService
    {
        Task<KioskDto> GetKioskByIdAsync(string id, bool trackChanges);

    }
}