using Entities.Models;
using Entities.RequestFeatures;

namespace Repositories.Contracts
{

    // Bu interface'i sadece UserRepository classı impelement etmesi gerekir. Çünkü IUserRepository interface'i sadece UserRepository classına özel işlemleri içerir.
    public interface IUserRepository : IRepositoryBase<WaterCard>
    {


        // Async operations
        Task<PagedList<User>> GetAllUsersAsync(UserParameters userParameters, bool trackChanges);
        Task<User> GetUserByIdAsync(string id, bool trackChanges);
        Task<List<User>> GetAllUsersAsync(bool trackChanges);

        // Sync operations
        void CreateUser(User user);
        void DeleteUser(User user);
        void UpdateUser(User user);
    }
}
