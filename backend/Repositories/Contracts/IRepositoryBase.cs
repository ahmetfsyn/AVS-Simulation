using System.Linq.Expressions;

namespace Repositories.Contracts
{


    // Bu interface her entity için temel CRUD işlemleri içerir ve her repository clasının bunu implement etmesi gerekir
    public interface IRepositoryBase<T>
    {

        IQueryable<T> FindAll(bool trackChanges);
        IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression, bool trackChanges);
        void Create(T entity);
        void Update(T entity);
        void Delete(T entity);

    }
}
