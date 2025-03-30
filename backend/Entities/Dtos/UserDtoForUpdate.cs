using System.ComponentModel.DataAnnotations;

namespace Entities.Dtos;
public record UserDtoForUpdate : UserDtoForManipulation
{

    [Required]
    public int Id { get; init; }
    // public string FirstName { get; init; }
    // public string LastName { get; init; }
    // public string TCNo { get; init; }

    // public UserDtoUpdate(int id, string firstName, string lastName, string tcNo)
    // {
    //     Id = id;
    //     FirstName = firstName;
    //     LastName = lastName;
    //     TCNo = tcNo;
    // }




}
