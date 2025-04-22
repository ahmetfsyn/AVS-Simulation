
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Presentation.ActionFilters;
using Services.Contracts;


namespace Presentation.Controllers
{
    [ApiVersion("1.0")]
    [ApiController]
    [Route("api/city-halls")]
    [ServiceFilter(typeof(LogFilterAttribute))]
    public class CityHallsController : ControllerBase
    {
        private readonly IServiceManager _manager;

        public CityHallsController(IServiceManager manager)
        {
            _manager = manager;
        }

        // [Authorize(Roles = "User")]
        // [ServiceFilter(typeof(ValidationFilterAttribute))]
        [HttpGet("{cityHallId}")]
        public async Task<IActionResult> GetCityHallByIdAsync([FromRoute] string cityHallId)
        {

            var cityHall = await _manager.CityHallService.GetCityHallByIdAsync(cityHallId, false);

            return Ok(cityHall);
        }
    }
}