

using Entities.Models;

namespace Repositories.Contracts
{
    public interface IKioskRepository : IRepositoryBase<Kiosk>
    {
        Task<Kiosk> GetKioskByIdAsync(string id, bool trackChanges);
    }
}