
using Entities.Dtos;
using Entities.LinkModels;
using Microsoft.AspNetCore.Http;

namespace Services.Contracts
{
    public interface IMeterLinks
    {
        LinkResponse TryGenerateLinks(IEnumerable<MeterDto> metersDto, string fields, HttpContext httpContext);
    }
}