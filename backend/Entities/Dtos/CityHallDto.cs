

namespace Entities.Dtos
{
    public record CityHallDto
    {
        public string Id { get; init; }
        public string Name { get; init; }
        public double MinCredit { get; init; }
        public double MaxCredit { get; init; }

    }
}