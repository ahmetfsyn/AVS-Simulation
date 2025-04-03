
using Entities.Dtos;
using Microsoft.AspNetCore.Mvc;
using Presentation.ActionFilters;
using Services.Contracts;

namespace Presentation.Controllers
{

    [ApiController]
    [Route("api/auth")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IServiceManager _service;

        public AuthenticationController(IServiceManager service)
        {
            _service = service;
        }


        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> RegisterUser([FromBody] UserDtoForRegistration userDtoForRegistration)
        {
            await _service.AuthenticationService.RegisterUser(userDtoForRegistration);

            return StatusCode(201);

        }
        [HttpPost("login")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Authenticate([FromBody] UserDtoForAuthentication userDtoForAuthentication)
        {

            if (!await _service.AuthenticationService.ValidateUser(userDtoForAuthentication))
            {
                return Unauthorized();
            }

            var tokenDto = await _service.AuthenticationService.CreateToken(true);

            return Ok(tokenDto);

        }

        [HttpPost("refresh-token")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> RefreshToken([FromBody] TokenDto tokenDto)
        {

            var newTokenDto = await _service.AuthenticationService.RefreshToken(tokenDto);

            return Ok(newTokenDto);
        }
    }
}