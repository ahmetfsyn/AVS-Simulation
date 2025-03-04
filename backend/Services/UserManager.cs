using System.Dynamic;
using AutoMapper;
using Entities.Dtos;
using Entities.Exceptions;
using Entities.LinkModels;
using Entities.Models;
using Entities.RequestFeatures;
using Repositories.Contracts;
using Services.Contracts;

namespace Services;


// User service'in ata classı
public class UserManager : IUserService
{

    private readonly IRepositoryManager _manager;
    private readonly ILoggerService _logger;
    private readonly IMapper _mapper;
    private readonly IUserLinks _userLinks;



    public UserManager(IRepositoryManager manager, ILoggerService logger, IMapper mapper, IUserLinks userLinks)
    {
        _manager = manager;
        _logger = logger;
        _mapper = mapper;
        _userLinks = userLinks;
    }

    // public UserDto CreateUser(UserDtoForInsertion userDto)
    // {

    //     var entity = _mapper.Map<User>(userDto);
    //     _manager.User.CreateUser(entity);
    //     _manager.Save();
    //     return _mapper.Map<UserDto>(entity);
    // }

    public async Task<UserDto> CreateUserAsync(UserDtoForInsertion userDto)
    {
        var entity = _mapper.Map<User>(userDto);
        _manager.User.CreateUser(entity);
        await _manager.SaveAsync();
        return _mapper.Map<UserDto>(entity);
    }

    // public void DeleteUser(int id, bool trackChanges)
    // {

    //     var entity = _manager.User.GetUserById(id, trackChanges);
    //     if (entity is null)
    //     {
    //         throw new UserNotFoundException(id);
    //     }
    //     _manager.User.DeleteUser(entity);
    //     _manager.Save();

    // }

    public async Task DeleteUserAsync(int id, bool trackChanges)
    {

        var entity = await GetUserByIdAndCheckExist(id, trackChanges);
        _manager.User.DeleteUser(entity);
        await _manager.SaveAsync();
    }

    // public IEnumerable<UserDto> GetAllUsers(bool trackChanges)
    // {
    //     var users = _manager.User.GetAllUsers(trackChanges);

    //     return _mapper.Map<IEnumerable<UserDto>>(users);
    // }

    public async Task<(LinkResponse linkResponse, MetaData metaData)> GetAllUsersAsync(LinkParameters linkParameters, bool trackChanges)
    {

        if (!linkParameters.UserParameters.ValidFirstName)
        {
            throw new FirstNameLengthOutOfRange();
        }

        var usersWithMetaData = await _manager.User.GetAllUsersAsync(linkParameters.UserParameters, trackChanges);

        var usersDto = _mapper.Map<IEnumerable<UserDto>>(usersWithMetaData);
        var links = _userLinks.TryGenerateLinks(usersDto, linkParameters.UserParameters.Fields, linkParameters.HttpContext);

        return (linkResponse: links, metaData: usersWithMetaData.MetaData);
    }

    // public UserDto GetUserById(int id, bool trackChanges)
    // {

    //     var user = _manager.User.GetUserById(id, trackChanges);

    //     if (user is null)
    //     {
    //         throw new UserNotFoundException(id);
    //     }

    //     return _mapper.Map<UserDto>(user);
    // }

    public async Task<UserDto> GetUserByIdAsync(int id, bool trackChanges)
    {
        var entity = await GetUserByIdAndCheckExist(id, trackChanges);


        return _mapper.Map<UserDto>(entity);
    }

    // public (UserDtoForUpdate userDtoUpdate, User user) GetUserForPatch(int id, bool trackChanges)
    // {

    //     var user = _manager.User.GetUserById(id, trackChanges);
    //     if (user is null)
    //     {
    //         throw new UserNotFoundException(id);
    //     }
    //     var userDtoForUpdate = _mapper.Map<UserDtoForUpdate>(user);
    //     return (userDtoForUpdate, user);

    // }

    public async Task<(UserDtoForUpdate userDtoUpdate, User user)> GetUserForPatchAsync(int id, bool trackChanges)
    {

        var entity = await GetUserByIdAndCheckExist(id, trackChanges);

        var userDtoForUpdate = _mapper.Map<UserDtoForUpdate>(entity);
        return (userDtoForUpdate, entity);

    }

    // public void SaveChangesForPatch(UserDtoForUpdate userDtoForUpdate, User user)
    // {

    //     _mapper.Map(userDtoForUpdate, user);
    //     _manager.Save();

    // }

    public async Task SaveChangesForPatchAsync(UserDtoForUpdate userDtoForUpdate, User user)
    {
        _mapper.Map(userDtoForUpdate, user);
        await _manager.SaveAsync();
    }

    // public void UpdateUser(int id, UserDtoForUpdate userDto, bool trackChanges)
    // {

    //     var entity = _manager.User.GetUserById(id, trackChanges) ?? throw new UserNotFoundException(id);

    //     // entity.FirstName = user.FirstName;
    //     // entity.LastName = user.LastName;
    //     // entity.TCNo = user.TCNo;

    //     entity = _mapper.Map<User>(userDto);

    //     _manager.User.UpdateUser(entity);
    //     _manager.Save();
    // }

    public async Task UpdateUserAsync(int id, UserDtoForUpdate userDto, bool trackChanges)
    {

        var entity = await GetUserByIdAndCheckExist(id, trackChanges);

        entity = _mapper.Map<User>(userDto);

        _manager.User.UpdateUser(entity);
        await _manager.SaveAsync();
    }


    private async Task<User> GetUserByIdAndCheckExist(int id, bool trackChanges)
    {

        var entity = await _manager.User.GetUserByIdAsync(id, trackChanges);
        if (entity is null)
        {
            throw new UserNotFoundException(id);
        }
        return entity;
    }

}
