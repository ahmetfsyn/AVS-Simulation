using System.Text.Json;
using Entities.Dtos;
using Entities.RequestFeatures;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Presentation.ActionFilters;
using Services.Contracts;

namespace Presentation.Controllers;


[ApiVersion("1.0")]
[ServiceFilter(typeof(LogFilterAttribute))]
[ApiController]
[Route("api/users")]
// [ResponseCache(CacheProfileName = "5mins")]
// [HttpCacheExpiration(CacheLocation = CacheLocation.Public, MaxAge = 80)]
public class UsersController : ControllerBase
{
    private readonly IServiceManager _manager;
    public UsersController(IServiceManager manager)
    {
        _manager = manager;
    }


    // [ResponseCache(Duration = 60)]
    // [Authorize(Roles = "User")]
    [HttpHead]
    [HttpGet(Name = "GetAllUsers")]
    [ServiceFilter(typeof(ValidateMediaTypeAttribute))]

    public async Task<IActionResult> GetAllUsersAsync([FromQuery] UserParameters userParameters)
    {

        var linkParameters = new LinkParameters()
        {
            UserParameters = userParameters,
            HttpContext = HttpContext,
        };


        var result = await _manager
        .UserService
        .GetAllUsersAsync(linkParameters, false);
        Response
        .Headers
        .Add("X-Pagination", JsonSerializer
        .Serialize(result.metaData));

        return result.linkResponse.HasLinks ? Ok(result.linkResponse.LinkedEntities) : Ok(result.linkResponse.ShapedEntities);
    }

    [Authorize(Roles = "User")]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserByIdAsync([FromRoute(Name = "id")] string id)
    {

        var user = await _manager.UserService.GetUserByIdAsync(id, false);
        return Ok(user);

    }

    [ServiceFilter(typeof(ValidationFilterAttribute))]
    [HttpPost(Name = "CreateUser")]
    [Authorize(Roles = "User")]
    public async Task<IActionResult> CreateUserAsync([FromBody] UserDtoForInsertion userDto)
    {

        var user = await _manager.UserService.CreateUserAsync(userDto);
        return StatusCode(201, user);

    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "User")]
    public async Task<IActionResult> DeleteUserAsync([FromRoute] string id)
    {
        await _manager.UserService.DeleteUserAsync(id, false);
        return NoContent();

    }

    [Authorize(Roles = "User")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUserAsync([FromRoute] string id, [FromBody] UserDtoForUpdate updatedUser)
    {

        if (updatedUser is null)
        {
            return BadRequest();
        }

        if (!ModelState.IsValid)
        {
            return UnprocessableEntity(ModelState);
        }

        await _manager.UserService.UpdateUserAsync(id, updatedUser, true);

        return NoContent();

    }

    [HttpPatch("{id}")]
    [Authorize(Roles = "User")]

    public async Task<IActionResult> PartiallyUpdateUserAsync([FromRoute] string id, [FromBody] JsonPatchDocument<UserDtoForUpdate> patchUser)
    {

        if (patchUser is null)
        {
            return BadRequest();
        }

        var result = await _manager.UserService.GetUserForPatchAsync(id, true);


        patchUser.ApplyTo(result.userDtoUpdate, ModelState);

        TryValidateModel(result.userDtoUpdate);

        if (!ModelState.IsValid)
        {
            return UnprocessableEntity(ModelState);
        }


        await _manager.UserService.SaveChangesForPatchAsync(result.userDtoUpdate, result.user);


        return NoContent();

    }


    [HttpOptions]
    public IActionResult GetUserOptions()
    {
        Response.Headers.Add("Allow", "GET,PUT,POST,PATCH,DELETE,HEAD,OPTIONS");
        return Ok();
    }


}
