using backend.Utilities.Tools;
using Microsoft.AspNetCore.Identity;

namespace Entities.Models
{
    public class User : IdentityUser
    {
        public override string? UserName { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? TCNo { get; set; }
        public string? SubscriberNo { get; set; } = Tools.GenerateUniqueValue();
        public bool IsBanned { get; set; } = false;
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        public ICollection<WaterCard> WaterCards { get; set; } = new List<WaterCard>();
        public ICollection<Meter> Meters { get; set; } = new List<Meter>();

    }
}
