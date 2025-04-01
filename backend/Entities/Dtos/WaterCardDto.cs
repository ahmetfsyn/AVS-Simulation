
namespace Entities.Dtos
{
    public record WaterCardDto
    {
        public string Id { get; init; }
        public int Credit { get; init; }
        public string MeterNo { get; init; }
        public string SubscriberNo { get; init; }
    }
}