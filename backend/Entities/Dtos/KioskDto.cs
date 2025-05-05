
namespace Entities.Dtos
{
    public record KioskDto
    {
        public string Id { get; init; }
        public string Name { get; init; }
        public string Latitude { get; init; }
        public string Longitude { get; init; }
        public bool IsActive { get; init; }

    }
}