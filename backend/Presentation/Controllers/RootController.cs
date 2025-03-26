using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities.LinkModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace Presentation.Controllers
{


    [ApiController]
    [Route("api")]
    public class RootController : ControllerBase
    {
        private readonly LinkGenerator _linkGenerator;

        public RootController(LinkGenerator linkGenerator)
        {
            _linkGenerator = linkGenerator;
        }
        [HttpGet(Name = "GetRoot")]
        public async Task<IActionResult> GetRoot([FromHeader(Name = "Accept")] string mediaType)
        {
            if (mediaType.Contains("application/vnd.ahmetfsyn.apiroot"))
            {
                var list = new List<Link>()
                {
                    new(){
                    Href = _linkGenerator.GetUriByName(HttpContext,nameof(GetRoot) , new{}),
                    Rel= "_self",
                    Method="GET"
                    },
                    new(){
                    Href = _linkGenerator.GetUriByName(HttpContext,nameof(UsersController.GetAllUsersAsync) , new{}),
                    Rel= "users",
                    Method="GET"
                    },
                    new(){
                    Href = _linkGenerator.GetUriByName(HttpContext,nameof(UsersController.CreateUserAsync) , new{}),
                    Rel= "users",
                    Method="POST"
                    },
                };
                return Ok(list);
            }
            return NoContent();
        }
    }
}