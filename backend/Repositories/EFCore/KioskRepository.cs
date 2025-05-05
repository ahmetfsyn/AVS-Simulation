

using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Contracts;

namespace Repositories.EFCore
{
    public class KioskRepository : RepositoryBase<Kiosk>, IKioskRepository
    {

        public KioskRepository(RepositoryContext context) : base(context)
        {
        }

        public async Task<Kiosk> GetKioskByIdAsync(string id, bool trackChanges)
        {
            return await FindByCondition(kiosk => kiosk.Id.Equals(id), trackChanges).SingleOrDefaultAsync();
        }
    }
}