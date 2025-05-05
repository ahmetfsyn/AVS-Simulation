
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Presentation.ActionFilters;
using Services.Contracts;

namespace Presentation.Controllers
{
    [ApiVersion("1.0")]
    [ApiController]
    [Route("api/kiosks")]
    [ServiceFilter(typeof(LogFilterAttribute))]
    public class KiosksController : Controller
    {
        private readonly IServiceManager _manager;

        public KiosksController(IServiceManager manager)
        {
            _manager = manager;
        }
        [HttpGet("{kioskId}")]
        public async Task<IActionResult> GetKioskByIdAsync([FromRoute] string kioskId)
        {

            var kiosk = await _manager.KioskService.GetKioskByIdAsync(kioskId, false);

            return Ok(kiosk);
        }
    }
}