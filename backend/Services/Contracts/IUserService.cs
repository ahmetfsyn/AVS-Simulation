using System.Dynamic;
using Entities.Dtos;
using Entities.LinkModels;
using Entities.Models;
using Entities.RequestFeatures;

namespace Services.Contracts
{

    // Entity service'i için interface
    public interface IUserService
    {
        // ! Sync operations ama async olanlar kullanılacak. Burası (sync methods) her zaman yorum satırı kalmalı
        // IEnumerable<UserDto> GetAllUsers(bool trackChanges);
        // UserDto GetUserById(int id, bool trackChanges);
        // UserDto CreateUser(UserDtoForInsertion user);
        // void UpdateUser(int id, UserDtoForUpdate userDto, bool trackChanges);
        // void DeleteUser(int id, bool trackChanges);
        // void SaveChangesForPatch(UserDtoForUpdate userDtoForUpdate, User user);
        // (UserDtoForUpdate userDtoUpdate, User user) GetUserForPatch(int id, bool trackChanges);

        // Async operations
        Task<(LinkResponse linkResponse, MetaData metaData)> GetAllUsersAsync(LinkParameters linkParameters, bool trackChanges);
        Task<UserDto> GetUserByIdAsync(int id, bool trackChanges);
        Task<UserDto> CreateUserAsync(UserDtoForInsertion user);
        Task UpdateUserAsync(int id, UserDtoForUpdate userDto, bool trackChanges);
        Task DeleteUserAsync(int id, bool trackChanges);
        Task SaveChangesForPatchAsync(UserDtoForUpdate userDtoForUpdate, User user);
        Task<(UserDtoForUpdate userDtoUpdate, User user)> GetUserForPatchAsync(int id, bool trackChanges);
        Task<List<User>> GetAllUsersAsync(bool trackChanges);
    }
}
