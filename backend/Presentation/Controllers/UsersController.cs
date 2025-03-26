using System.Text.Json;
using Entities.Dtos;
using Entities.RequestFeatures;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Presentation.ActionFilters;
using Services.Contracts;

namespace Presentation.Controllers;


[ApiVersion("1.0")]
[ServiceFilter(typeof(LogFilterAttribute))]
[ApiController]
[Route("api/{v:apiversion}/users")]
public class UsersController : ControllerBase
{
    private readonly IServiceManager _manager;
    public UsersController(IServiceManager manager)
    {
        _manager = manager;
    }

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

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetUserByIdAsync([FromRoute(Name = "id")] int id)
    {

        var user = await _manager.UserService.GetUserByIdAsync(id, false);
        return Ok(user);

    }


    [ServiceFilter(typeof(ValidationFilterAttribute))]
    [HttpPost(Name = "CreateUser")]
    public async Task<IActionResult> CreateUserAsync([FromBody] UserDtoForInsertion userDto)
    {

        var user = await _manager.UserService.CreateUserAsync(userDto);
        return StatusCode(201, user);

    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteUserAsync([FromRoute] int id)
    {
        await _manager.UserService.DeleteUserAsync(id, false);
        return NoContent();

    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateUserAsync([FromRoute] int id, [FromBody] UserDtoForUpdate updatedUser)
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

    [HttpPatch("{id:int}")]
    public async Task<IActionResult> PartiallyUpdateUserAsync([FromRoute] int id, [FromBody] JsonPatchDocument<UserDtoForUpdate> patchUser)
    {

        if (patchUser is null)
        {
            return BadRequest();
        }

        var result = await _manager.UserService.GetUserForPatchAsync(id, false);


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
