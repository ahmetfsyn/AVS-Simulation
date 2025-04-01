namespace Entities.Dtos
{
    public record WaterCardDtoForUpdate
    {

        public string? Id { get; set; }
        public int? Credit { get; set; } = 0;
        public string? SubscriberNo { get; set; }
    }
}