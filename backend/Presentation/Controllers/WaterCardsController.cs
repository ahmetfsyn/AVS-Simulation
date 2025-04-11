using Entities.Dtos;
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


        [HttpGet("user/{userId}", Name = "GetWaterCardsByUserId")]
        [Authorize(Roles = "User")]
        // [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> GetWaterCardsByUserIdAsync([FromRoute] string userId)
        {

            var waterCards = await _manager.WaterCardService.GetWaterCardsByUserIdAsync(userId, false);

            return Ok(waterCards);
        }


        [HttpDelete("{waterCardId}", Name = "DeleteWaterCardById")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> DeleteWaterCardByIdAsync([FromRoute] string waterCardId)
        {
            await _manager.WaterCardService.DeleteWaterCardAsync(waterCardId, true);
            return Ok();
        }


        [HttpPost(Name = "CreateWaterCard")]
        [Authorize(Roles = "User")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> CreateWaterCardAsync([FromBody] WaterCardDtoForInsertion waterCardDtoForInsertion)
        {

            var waterCard = await _manager.WaterCardService.CreateWaterCardAsync(waterCardDtoForInsertion);
            return StatusCode(201, waterCard);

        }

        [HttpPatch("{waterCardId}", Name = "PartiallyUpdateWaterCard")]
        [Authorize(Roles = "User")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> PartiallyUpdateWaterCardAsync([FromRoute] string waterCardId, [FromBody] JsonPatchDocument<WaterCardDtoForUpdate> waterCardDtoForUpdate)
        {

            if (waterCardDtoForUpdate is null || waterCardDtoForUpdate.Operations.Count == 0)
            {
                return BadRequest();
            }

            var result = await _manager.WaterCardService.GetWaterCardForPatchAsync(waterCardId, true);

            waterCardDtoForUpdate.ApplyTo(result.waterCardDtoForUpdate, ModelState);

            TryValidateModel(result.waterCardDtoForUpdate);

            if (!ModelState.IsValid)
            {
                return UnprocessableEntity(ModelState);
            }

            await _manager.WaterCardService.SaveChangesForPatchAsync(result.waterCardDtoForUpdate, result.waterCard);

            return Ok(result.waterCard);

        }



        [Authorize(Roles = "User")]
        [HttpPut("{waterCardId}")]
        public async Task<IActionResult> UpdateWaterCardAsync([FromRoute] string waterCardId, [FromBody] WaterCardDtoForUpdate waterCardDtoForUpdate)
        {

            if (waterCardDtoForUpdate is null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return UnprocessableEntity(ModelState);
            }

            await _manager.WaterCardService.UpdateWaterCardAsync(waterCardId, waterCardDtoForUpdate, true);

            return NoContent();

        }



    }
}