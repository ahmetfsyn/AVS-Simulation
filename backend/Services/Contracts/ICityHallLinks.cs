using Entities.Dtos;
using Entities.LinkModels;
using Microsoft.AspNetCore.Http;

namespace Services.Contracts
{
    public interface ICityHallLinks
    {
        LinkResponse TryGenerateLinks(IEnumerable<CityHallDto> cityHallsDto, string fields, HttpContext httpContext);

    }
}