using System.Text.Json;
using Entities.Dtos;
using Entities.RequestFeatures;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Presentation.ActionFilters;
using Services.Contracts;



namespace Presentation.Controllers
{
    [ServiceFilter(typeof(LogFilterAttribute))]
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
        [ServiceFilter(typeof(ValidateMediaTypeAttribute))]
        public async Task<IActionResult> GetAllCityHalls(
            [FromQuery] CityHallParameters cityHallParameters
        )
        {
            var linkParameters = new LinkParameters()
            {
                CityHallParameters = cityHallParameters,
                HttpContext = HttpContext,
            };

            var result = await _manager
            .CityHallService
            .GetAllCityHallsAsync(linkParameters, false);
            Response
            .Headers
            .Add("X-Pagination", JsonSerializer
            .Serialize(result.metaData));

            return result.linkResponse.HasLinks ? Ok(result.linkResponse.LinkedEntities) : Ok(result.linkResponse.ShapedEntities);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetCityHallById([FromRoute(Name = "id")] int id)
        {


            var cityHall = await _manager.CityHallService.GetCityHallByIdAsync(id, false);
            return Ok(cityHall);

        }

        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [HttpPost]
        public async Task<IActionResult> CreateCityHall([FromBody] CityHallDtoForInsertion cityHallDto)
        {

            var cityHall = await _manager.CityHallService.CreateCityHallAsync(cityHallDto);
            return StatusCode(201, cityHall);

        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteCityHall([FromRoute] int id)
        {

            await _manager.CityHallService.DeleteCityHallAsync(id, false);
            return NoContent();

        }


    }
}