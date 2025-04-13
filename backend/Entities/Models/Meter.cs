
using backend.Utilities.Tools;

namespace Entities.Models
{
    public class Meter
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string? MeterNo { get; set; } = Tools.GenerateUniqueValue();
        public string? Address { get; set; }

        // ilişki tanımlamaları
        public string? WaterCompanyId { get; set; }
        public WaterCompany? WaterCompany { get; set; }
        public string SubscriberNo { get; set; } = default!;
        public User? User { get; set; }

    }
}