using System.ComponentModel.DataAnnotations;

namespace Entities.Dtos
{
    public record UserDtoForRegistration
    {

        [Required(ErrorMessage = "Firstname is required")]
        public string? FirstName { get; set; }

        [Required(ErrorMessage = "Lastname is required")]
        public string? LastName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Username is required")]
        public string? UserName { get; set; }

        [Required(ErrorMessage = "Tcno is required")]
        public string? TcNo { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }

        [Required(ErrorMessage = "Confirm password is required")]
        public string? ConfirmPassword { get; set; }

        public ICollection<string>? Roles { get; init; }
    }
}