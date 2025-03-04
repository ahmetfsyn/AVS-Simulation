using Entities.Dtos;
using Entities.LinkModels;
using Microsoft.AspNetCore.Http;

namespace Services.Contracts
{
    public interface IUserLinks
    {
        LinkResponse TryGenerateLinks(IEnumerable<UserDto> usersDto, string fields, HttpContext httpContext);
    }
}