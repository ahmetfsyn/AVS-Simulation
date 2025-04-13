
namespace Entities.Models
{
    public class WaterCard
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public int? Credit { get; set; } = 0;
        public string? MeterNo { get; set; }
        // ilişki tanımlamaları
        public string SubscriberNo { get; set; } = default!;
        public string? UserId { get; set; }
        public User? User { get; set; }


    }
}