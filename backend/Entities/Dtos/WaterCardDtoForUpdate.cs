
using System.ComponentModel.DataAnnotations;

namespace Entities.Dtos
{
    public record WaterCardDtoForUpdate : WaterCardDtoForManipulation
    {
        [Required(ErrorMessage = "Credit is required field.")]
        public int? Credit { get; init; }

    }
}