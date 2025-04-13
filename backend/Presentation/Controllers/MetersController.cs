using System.Text.Json;
using Entities.Dtos;
using Entities.RequestFeatures;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Presentation.ActionFilters;
using Services.Contracts;

namespace Presentation.Controllers
{

    [ApiVersion("1.0")]
    [ApiController]
    [Route("api/meters")]
    [ServiceFilter(typeof(LogFilterAttribute))]

    public class MetersController : ControllerBase
    {
        private readonly IServiceManager _manager;
        public MetersController(IServiceManager manager)
        {
            _manager = manager;
        }


        // [ResponseCache(Duration = 60)]
        // [Authorize(Roles = "User")]
        [HttpGet(Name = "GetAllMeters")]
        [HttpHead]
        [ServiceFilter(typeof(ValidateMediaTypeAttribute))]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetAllMetersAsync([FromQuery] MeterParameters meterParameters)
        {

            var linkParameters = new LinkParameters()
            {
                MeterParameters = meterParameters,
                HttpContext = HttpContext,
            };


            var result = await _manager
            .MeterService
            .GetAllMetersAsync(linkParameters, false);
            Response
            .Headers
            .Add("X-Pagination", JsonSerializer
            .Serialize(result.metaData));

            return result.linkResponse.HasLinks ? Ok(result.linkResponse.LinkedEntities) : Ok(result.linkResponse.ShapedEntities);
        }



    }
}