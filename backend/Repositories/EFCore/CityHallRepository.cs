using System.Linq.Expressions;
using Entities.Models;
using Repositories.Contracts;

namespace Repositories.EFCore
{
    public class CityHallRepository : RepositoryBase<CityHall>, ICityHallRepository
    {
        public CityHallRepository(RepositoryContext context) : base(context)
        {
        }

        public void CreateCityHall(CityHall cityHall)
        {

            Create(cityHall);

        }

        public void DeleteCityHall(CityHall cityHall)
        {

            Delete(cityHall);
        }

        public IQueryable<CityHall> GetAllCityHalls(bool trackChanges)
        {
            return FindAll(trackChanges).OrderBy(cityHall => cityHall.Id);
        }

        public CityHall GetCityHallById(int id, bool trackChanges)
        {
            return FindByCondition((cityHall) => cityHall.Id == id, trackChanges).SingleOrDefault();
        }
    }
}