using Entities.RequestFeatures;
using Microsoft.AspNetCore.Http;

namespace Entities.Dtos
{
    public record LinkParameters
    {
        public UserParameters UserParameters { get; init; }
        public CityHallParameters CityHallParameters { get; init; }

        public HttpContext HttpContext { get; init; }

    }
}