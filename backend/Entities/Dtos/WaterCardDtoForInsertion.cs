

namespace Entities.Dtos
{
    public record WaterCardDtoForInsertion : WaterCardDtoForManipulation
    {
        public string? UserId { get; init; }
        public string? SubscriberNo { get; init; }
        public string? MeterNo { get; init; }
        public int? Credit { get; init; } = 0;

    }
}