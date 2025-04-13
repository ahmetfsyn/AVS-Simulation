using Entities.RequestFeatures;
using Microsoft.AspNetCore.Http;

namespace Entities.Dtos
{
    public record LinkParameters
    {
        public UserParameters UserParameters { get; init; }
        public MeterParameters MeterParameters { get; init; }
        public HttpContext HttpContext { get; init; }

    }
}