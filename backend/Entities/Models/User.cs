using Microsoft.AspNetCore.Identity;

namespace Entities.Models
{
    // User Modeli
    public class User : IdentityUser
    {
        // public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? TCNo { get; set; }
        public ICollection<WaterCard>? WaterCards { get; set; }

        //  ? Email zaten kalıtımdan geliyor.tanımlamaya gerek yok.
        // public  string? Email { get; set; }

        public override string? UserName { get; set; }


    }
}
