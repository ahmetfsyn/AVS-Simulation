using Microsoft.AspNetCore.Identity;

namespace Entities.Models
{
    public class User : IdentityUser
    {
        public override string? UserName { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? TCNo { get; set; }
        public string? SubscriberNo { get; set; }
        public bool IsBanned { get; set; } = false;
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        public ICollection<WaterCard> WaterCards { get; set; } = new List<WaterCard>();

        public User()
        {
            SubscriberNo = GenerateUniqueSubscriberNo();
        }
        private string GenerateUniqueSubscriberNo()
        {
            string subscriberNo;
            var random = new Random();

            subscriberNo = random.Next(1000000, 9999999).ToString();

            return subscriberNo;
        }
    }
}
