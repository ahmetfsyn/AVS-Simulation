using System.Linq.Expressions;
using Entities.Models;
using Entities.RequestFeatures;
using Microsoft.EntityFrameworkCore;
using Repositories.Contracts;
using Repositories.EFCore;
using Repositories.EFCore.Extensions;


namespace Repositories
{
    public class MeterRepository : RepositoryBase<Meter>, IMeterRepository
    {
        public MeterRepository(RepositoryContext context) : base(context)
        {
        }


        //  Kullanacaksan eğer önce interface te bu metodları olusturmalısın.
        public void Create(Meter entity)
        {
            throw new NotImplementedException();
        }
        //  Kullanacaksan eğer önce interface te bu metodları olusturmalısın.

        public void Delete(Meter entity)
        {
            throw new NotImplementedException();
        }
        //  Kullanacaksan eğer önce interface te bu metodları olusturmalısın.

        public IQueryable<Meter> FindByCondition(Expression<Func<Meter, bool>> expression, bool trackChanges)
        {
            throw new NotImplementedException();
        }

        public async Task<PagedList<Meter>> GetAllMetersAsync(MeterParameters meterParameters, bool trackChanges)
        {
            var meters = await FindAll(trackChanges)
            .FilterMeters(meterParameters.SubscriberNo)
                      .Search(meterParameters.SearchTerm)
                      .Sort(meterParameters.OrderBy)
                      .ToListAsync();


            return PagedList<Meter>
            .ToPagedList(meters, meterParameters.PageNumber, meterParameters.PageSize);
        }
        //  Kullanacaksan eğer önce interface te bu metodları olusturmalısın.

        public void Update(Meter entity)
        {
            throw new NotImplementedException();
        }
        //  Kullanacaksan eğer önce interface te bu metodları olusturmalısın.


    }
}