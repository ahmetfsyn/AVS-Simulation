using Entities.Dtos;
using Entities.Models;
using Microsoft.AspNetCore.Identity;

namespace Services.Contracts
{
    public interface IAuthenticationService
    {
        Task<IdentityResult> RegisterUser(UserDtoForRegistration userDtoForRegistration);
        Task<UserDto> ValidateUser(UserDtoForAuthentication userDtoForAuthentication);
        Task<TokenDto> CreateToken(bool populateExp);
        Task<TokenDto> RefreshToken(TokenDto tokenDto);



    }
}