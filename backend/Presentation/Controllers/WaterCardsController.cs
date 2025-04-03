using System.Text.Json;
using Entities.Dtos;
using Entities.RequestFeatures;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Presentation.ActionFilters;
using Services.Contracts;

namespace Presentation.Controllers
{

    [ApiVersion("1.0")]
    [ApiController]
    [Route("api/water-cards")]
    [ServiceFilter(typeof(LogFilterAttribute))]

    public class WaterCardsController : ControllerBase
    {
        private readonly IServiceManager _manager;
        public WaterCardsController(IServiceManager manager)
        {
            _manager = manager;
        }

        [HttpPost(Name = "CreateWaterCard")]
        [Authorize(Roles = "User")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> CreateWaterCardAsync([FromBody] WaterCardDtoForInsertion waterCardDtoForInsertion)
        {

            var waterCard = await _manager.WaterCardService.CreateWaterCardAsync(waterCardDtoForInsertion);
            return StatusCode(201, waterCard);

        }

        [HttpPatch("{id}", Name = "PartiallyUpdateWaterCard")]
        [Authorize(Roles = "User")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> PartiallyUpdateWaterCardAsync([FromRoute] string id, [FromBody] JsonPatchDocument<WaterCardDtoForUpdate> waterCardDtoForUpdate)
        {

            if (waterCardDtoForUpdate is null || waterCardDtoForUpdate.Operations.Count == 0)
            {
                return BadRequest();
            }

            var result = await _manager.WaterCardService.GetWaterCardForPatchAsync(id, true);

            waterCardDtoForUpdate.ApplyTo(result.waterCardDtoForUpdate, ModelState);

            TryValidateModel(result.waterCardDtoForUpdate);

            if (!ModelState.IsValid)
            {
                return UnprocessableEntity(ModelState);
            }

            await _manager.WaterCardService.SaveChangesForPatchAsync(result.waterCardDtoForUpdate, result.waterCard);

            return Ok(result.waterCard);

        }

    }
}