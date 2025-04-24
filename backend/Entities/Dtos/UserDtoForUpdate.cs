using System.ComponentModel.DataAnnotations;

namespace Entities.Dtos;
public record UserDtoForUpdate : UserDtoForManipulation
{
    public string? PhoneNumber { get; init; }
    public string? Email { get; init; }

}
