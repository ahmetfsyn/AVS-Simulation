using System.ComponentModel.DataAnnotations;

namespace Entities.Dtos
{
    public record UserDtoForAuthentication
    {

        // [Required(ErrorMessage = "Email is required.")]
        public string? Email { get; init; }

        [Required(ErrorMessage = "TcNo is required.")]
        public string? TCNo { get; init; }

        [Required(ErrorMessage = "Password is required.")]
        public string? Password { get; init; }
    }
}