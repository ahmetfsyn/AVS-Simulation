using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class WaterCard
    {
        public string? Id { get; set; }
        public int? Credit { get; set; } = 0;
        public string? MeterNo { get; set; }
        public string? SubscriberNo { get; set; }

        // ilişki tanımlamaları
        public string? UserId { get; set; }
        public User? User { get; set; }


    }
}