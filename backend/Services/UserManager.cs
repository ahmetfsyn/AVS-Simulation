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

    public async Task<UserDto> CreateUserAsync(UserDtoForInsertion userDtoForInsertion)
    {
        var entity = _mapper.Map<User>(userDtoForInsertion);
        _manager.User.CreateUser(entity);
        await _manager.SaveAsync();
        return _mapper.Map<UserDto>(entity);
    }


    public async Task DeleteUserAsync(string id, bool trackChanges)
    {

        var entity = await GetUserByIdAndCheckExist(id, trackChanges);
        _manager.User.DeleteUser(entity);
        await _manager.SaveAsync();
    }


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

    public async Task<List<User>> GetAllUsersAsync(bool trackChanges)
    {
        var users = await _manager.User.GetAllUsersAsync(trackChanges);
        return users;
    }

    public async Task<UserDto> GetUserByIdAsync(string id, bool trackChanges)
    {
        var entity = await GetUserByIdAndCheckExist(id, trackChanges);

        return _mapper.Map<UserDto>(entity);
    }


    public async Task<(UserDtoForUpdate userDtoUpdate, User user)> GetUserForPatchAsync(string id, bool trackChanges)
    {

        var entity = await GetUserByIdAndCheckExist(id, trackChanges);

        var userDtoForUpdate = _mapper.Map<UserDtoForUpdate>(entity);
        return (userDtoForUpdate, entity);

    }


    public async Task SaveChangesForPatchAsync(UserDtoForUpdate userDtoForUpdate, User user)
    {
        _mapper.Map(userDtoForUpdate, user);
        await _manager.SaveAsync();
    }


    public async Task UpdateUserAsync(string id, UserDtoForUpdate userDtoForUpdate, bool trackChanges)
    {

        var entity = await GetUserByIdAndCheckExist(id, trackChanges);

        entity = _mapper.Map<User>(userDtoForUpdate);

        _manager.User.UpdateUser(entity);
        await _manager.SaveAsync();
    }


    private async Task<User> GetUserByIdAndCheckExist(string id, bool trackChanges)
    {

        var entity = await _manager.User.GetUserByIdAsync(id, trackChanges);
        if (entity is null)
        {
            throw new UserNotFoundException(id);
        }
        return entity;
    }

}
