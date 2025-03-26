using Entities.Models;
using Entities.RequestFeatures;
using Microsoft.EntityFrameworkCore;
using Repositories.Contracts;

namespace Repositories.EFCore
{

    // UserRepository classı RepositoryBase classını ve IUserRepository interfaceini kalıtıyor. Çünkü UserRepository userların db işlemlerini barındırır.
    public sealed class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(RepositoryContext context) : base(context) { }

        public void CreateUser(User user) => Create(user);
        public void DeleteUser(User user) => Delete(user);
        public void UpdateUser(User user) => Update(user);

        public async Task<PagedList<User>> GetAllUsersAsync(UserParameters userParameters, bool trackChanges)
        {

            var users = await FindAll(trackChanges).FilterUsers(userParameters.FirstName)
            .Search(userParameters.SearchTerm)
            .Sort(userParameters.OrderBy)
            .ToListAsync();


            return PagedList<User>
            .ToPagedList(users, userParameters.PageNumber, userParameters.PageSize);
        }

        public async Task<User> GetUserByIdAsync(int id, bool trackChanges)
        {
            return await FindByCondition(user => user.Id == id, trackChanges)
            .SingleOrDefaultAsync();
        }

        public async Task<List<User>> GetAllUsersAsync(bool trackChanges)
        {
            return await FindAll(trackChanges).OrderBy(user => user.Id).ToListAsync();
        }
    }
}
