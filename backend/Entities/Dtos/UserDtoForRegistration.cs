using System.ComponentModel.DataAnnotations;

namespace Entities.Dtos
{
    public record UserDtoForRegistration
    {

        [Required(ErrorMessage = "Firstname is required")]
        public string? FirstName { get; init; }

        [Required(ErrorMessage = "Lastname is required")]
        public string? LastName { get; init; }

        // [Required(ErrorMessage = "Email is required")]
        // public string? Email { get; init; }

        [Required(ErrorMessage = "Username is required")]
        public string? UserName { get; init; }

        [Required(ErrorMessage = "Tcno is required")]
        public string? TcNo { get; init; }

        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; init; }

        [Required(ErrorMessage = "Confirm password is required")]
        public string? ConfirmPassword { get; init; }

        public ICollection<string>? Roles { get; init; }
    }
}