
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Contracts;

namespace Repositories.EFCore
{
    public class CityHallRepository : RepositoryBase<CityHall>, ICityHallRepository
    {
        public CityHallRepository(RepositoryContext context) : base(context)
        {
        }

        public async Task<CityHall> GetCityHallByIdAsync(string id, bool trackChanges)
        {
            return await FindByCondition(cityHall => cityHall.Id.Equals(id), trackChanges).SingleOrDefaultAsync();
        }
    }
}