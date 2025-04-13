

namespace Entities.Dtos
{
    public record MeterDto
    {
        public string? Id { get; init; }
        public string? MeterNo { get; init; }
        public string? WaterCompanyName { get; set; }
        public string? SubscriberNo { get; init; }
        public string? Address { get; init; }

    }
}