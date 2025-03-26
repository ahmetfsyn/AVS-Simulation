using Microsoft.AspNetCore.Mvc;
using Services.Contracts;

namespace Presentation.Controllers
{

    [ApiVersion("2.0", Deprecated = true)]
    [ApiController]
    [Route("api/users")]
    public class UsersV2Controller : ControllerBase
    {
        private readonly IServiceManager _manager;
        public UsersV2Controller(IServiceManager manager)
        {
            _manager = manager;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllUsersAsync()
        {
            var users = await _manager.UserService.GetAllUsersAsync(false);
            var usersV2 = users.Select(user => new
            {
                user.Id,
                user.FirstName,
            });

            return Ok(usersV2);
        }
    }
}