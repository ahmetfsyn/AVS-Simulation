using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using Entities.Dtos;
using Entities.Exceptions;
using Entities.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;   // <<< bunu dosyanın en üstüne ekle
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Services.Contracts;

namespace Services
{
    public class AuthenticationManager : IAuthenticationService
    {

        private readonly ILoggerService _logger;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        private User? _user;

        public AuthenticationManager(ILoggerService logger, IMapper mapper, UserManager<User> userManager, IConfiguration configuration)
        {
            _logger = logger;
            _mapper = mapper;
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<TokenDto> CreateToken(bool populateExp)
        {
            var signInCredentials = GetSignInCredentials();
            var claims = await GetClaims();
            var tokenOptions = GenerateTokenOptions(signInCredentials, claims);

            var refreshToken = GenerateRefreshToken();
            _user.RefreshToken = refreshToken;

            if (populateExp)
            {
                _user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            }

            var result = await _userManager.UpdateAsync(_user);

            if (!result.Succeeded)
            {
                throw new Exception("Failed to update user refresh token.");

            }

            var accessToken = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return new TokenDto()
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };

        }



        public async Task<IdentityResult> RegisterUser(UserDtoForRegistration userDtoForRegistration)
        {

            var user = _mapper.Map<User>(userDtoForRegistration);

            var result = await _userManager.CreateAsync(user, userDtoForRegistration.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRolesAsync(user, userDtoForRegistration.Roles);
            }
            else
            {
                throw new RegistrationFailedException("REGISTRATION_FAILED", result.Errors.ToList());
            }
            return result;

        }

        public async Task<UserDto> ValidateUser(UserDtoForAuthentication userDtoForAuthentication)
        {
            _user = await _userManager.FindByEmailAsync(userDtoForAuthentication.Email);

            if (_user is null)
            {
                throw new LoginFailedException("LOGIN_FAILED", new List<IdentityError>
                {
                    new() { Code = "InvalidEmail", Description = "No user found with this email address." }
                });
            }

            var result = await _userManager.CheckPasswordAsync(_user, userDtoForAuthentication.Password);

            if (!result)
            {
                _logger.LogWarning($"{nameof(ValidateUser)} : Authentication failed. Wrong email or password.");

                throw new LoginFailedException("LOGIN_FAILED", new List<IdentityError>
                {
                    new() { Code = "InvalidEmailOrPassword", Description = "Email or password is incorrect." }
                });
            }

            var userDto = _mapper.Map<UserDto>(_user);

            return userDto;
        }

        public async Task<UserDto> ValidateUserByTcNo(UserDtoForAuthentication userDtoForAuthentication)
        {
            // Users koleksiyonunu IQueryable olarak kullanabilirsiniz:
            _user = await _userManager.Users
               .FirstOrDefaultAsync(_user => _user.TCNo == userDtoForAuthentication.TCNo);
            if (_user is null)
            {
                _logger.LogWarning($"{nameof(ValidateUserByTcNo)} : No user found with this tcNo.");

                throw new LoginFailedException("LOGIN_FAILED", new List<IdentityError>
                {
                    new() { Code = "InvalidTcNoOrPassword", Description = "TcNo or password is incorrect." }
                });
            }

            var result = await _userManager.CheckPasswordAsync(_user, userDtoForAuthentication.Password);

            if (!result)
            {
                _logger.LogWarning($"{nameof(ValidateUserByTcNo)} : Authentication failed. Wrong tcNo or password.");

                throw new LoginFailedException("LOGIN_FAILED", new List<IdentityError>
                {
                    new() { Code = "InvalidTcNoOrPassword", Description = "TcNo or password is incorrect." }
                });
            }

            var userDto = _mapper.Map<UserDto>(_user);

            return userDto;
        }


        private JwtSecurityToken GenerateTokenOptions(SigningCredentials signInCredentials, List<Claim> claims)
        {
            var jwtSettings = _configuration.GetSection("JWTSettings");

            // JwtSecurityToken oluşturuluyor
            var tokenOptions = new JwtSecurityToken(
                issuer: jwtSettings["validIssuer"],
                audience: jwtSettings["validAudience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings["expires"])),
                signingCredentials: signInCredentials
            );

            return tokenOptions;
        }

        private async Task<List<Claim>> GetClaims()
        {

            var claims = new List<Claim>()
            {
                new(ClaimTypes.Name, _user.UserName ),
            };

            var roles = await _userManager.GetRolesAsync(_user);


            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            return claims;

        }
        public async Task<TokenDto> RefreshToken(TokenDto tokenDto)
        {
            var principal = GetPrincipalFromExpired(tokenDto.AccessToken);

            var user = await _userManager.FindByNameAsync(principal.Identity.Name);


            if (user is null || user.RefreshToken != tokenDto.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                throw new RefreshTokenBadRequestException();
            }

            _user = user;
            return await CreateToken(populateExp: false);
        }

        private SigningCredentials GetSignInCredentials()
        {

            var jwtSettings = _configuration.GetSection("JWTSettings");
            var key = Encoding.UTF8.GetBytes(jwtSettings["secretKey"]);
            var secret = new SymmetricSecurityKey(key);
            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);

        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];

            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }

        }

        private ClaimsPrincipal GetPrincipalFromExpired(string token)
        {
            var jwtSettings = _configuration.GetSection("JWTSettings");
            var secretKey = jwtSettings["secretKey"];
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = false,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtSettings["validIssuer"],
                ValidAudience = jwtSettings["validAudience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;

            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);

            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken is null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token: " + token);
            }

            return principal;
        }


    }
}