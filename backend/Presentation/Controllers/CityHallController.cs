using Entities.Dtos;
using Entities.Exceptions;
using Entities.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Services.Contracts;


namespace Presentation.Controllers
{

    [ApiController]
    [Route("api/city-halls")]
    public class CityHallController : ControllerBase
    {
        private readonly IServiceManager _manager;

        public CityHallController(IServiceManager manager)
        {
            _manager = manager;
        }


        [HttpGet]
        public IActionResult GetAllCityHall()
        {
            var cityHalls = _manager.CityHallService.GetAllCityHalls(false);
            return Ok(cityHalls);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetCityHallById([FromRoute(Name = "id")] int id)
        {


            var cityHall = _manager.CityHallService.GetCityHallById(id, false);

            return Ok(cityHall);

        }

        [HttpPost]
        public IActionResult CreateCityHall([FromBody] CityHall cityHall)
        {

            if (cityHall is null)
            {
                return BadRequest();
            }

            _manager.CityHallService.CreateCityHall(cityHall);
            return StatusCode(201, cityHall);

        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteCityHall([FromRoute] int id)
        {

            _manager.CityHallService.DeleteCityHall(id, false);
            return NoContent();

        }


    }
}