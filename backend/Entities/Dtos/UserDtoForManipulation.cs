using System.ComponentModel.DataAnnotations;

namespace Entities.Dtos

{
    public abstract record UserDtoForManipulation
    {

        [Required(ErrorMessage = "FirstName is a required field")]
        [MinLength(3, ErrorMessage = "FirstName must be min 3 characters")]
        [MaxLength(25, ErrorMessage = "FirstName must be max 25 characters")]
        public string FirstName { get; init; }

        [Required(ErrorMessage = "LastName is a required field")]
        [MinLength(3, ErrorMessage = "LastName must be min 3 characters")]
        [MaxLength(25, ErrorMessage = "LastName must be max 25 characters")]
        public string LastName { get; init; }

        [Required(ErrorMessage = "TCNo is a required field")]
        [MinLength(11, ErrorMessage = "TCNo must be 11 characters")]
        [MaxLength(11, ErrorMessage = "TCNo must be 11 characters")]
        [RegularExpression(@"^\d+$", ErrorMessage = "TCNo must contains only numbers")]
        public string TCNo { get; init; }

    }
}