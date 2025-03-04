using System.ComponentModel.DataAnnotations;

namespace Entities.Dtos
{
    public abstract record CityHallDtoForManipulation
    {
        [Required(ErrorMessage = "City is a required field")]
        [MinLength(3, ErrorMessage = "City must be min 3 characters")]
        [MaxLength(25, ErrorMessage = "City must be max 25 characters")]
        public string City { get; init; }

        [Required(ErrorMessage = "CityHallName is a required field")]
        [MinLength(3, ErrorMessage = "CityHallName must be min 3 characters")]
        [MaxLength(25, ErrorMessage = "CityHallName must be max 25 characters")]
        public string CityHallName { get; init; }

    }
}