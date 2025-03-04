using System.Linq.Expressions;
using Entities.Models;
using Entities.RequestFeatures;
using Microsoft.EntityFrameworkCore;
using Repositories.Contracts;
using Repositories.EFCore.Extensions;

namespace Repositories.EFCore
{
    public class CityHallRepository : RepositoryBase<CityHall>, ICityHallRepository
    {
        public CityHallRepository(RepositoryContext context) : base(context)
        {
        }

        public void CreateCityHall(CityHall cityHall) => Create(cityHall);
        public void DeleteCityHall(CityHall cityHall) => Delete(cityHall);
        public async Task<PagedList<CityHall>> GetAllCityHallsAsync(CityHallParameters cityHallParameters, bool trackChanges)
        {

            var cityHalls = await FindAll(trackChanges).FilterCityHalls(cityHallParameters.CityName)
            .Search(cityHallParameters.SearchTerm)
            .Sort(cityHallParameters.OrderBy)
            .ToListAsync();


            return PagedList<CityHall>
            .ToPagedList(cityHalls, cityHallParameters.PageNumber, cityHallParameters.PageSize);
        }

        public async Task<CityHall> GetCityHallByIdAsync(int id, bool trackChanges)
        {
            return await FindByCondition(cityHall => cityHall.Id == id, trackChanges)
                       .SingleOrDefaultAsync();
        }


    }
}