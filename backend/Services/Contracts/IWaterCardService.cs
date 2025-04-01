
using Entities.Dtos;
using Entities.Models;

namespace Services.Contracts
{
    public interface IWaterCardService
    {
        Task<WaterCardDto> GetWaterCardByIdAsync(string id, bool trackChanges);
        Task<WaterCardDto> CreateWaterCardAsync(WaterCardDtoForInsertion waterCardDtoForInsertion);
        Task UpdateWaterCardAsync(string id, WaterCardDtoForUpdate waterCardDtoForUpdate, bool trackChanges);
        Task DeleteWaterCardAsync(string id, bool trackChanges);
        Task SaveChangesForPatchAsync(WaterCardDtoForUpdate waterCardDtoForUpdate, WaterCard waterCard);
        Task<(WaterCardDtoForUpdate waterCardDtoForUpdate, WaterCard waterCard)> GetWaterCardForPatchAsync(string id, bool trackChanges);
    }
}