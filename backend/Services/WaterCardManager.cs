
using AutoMapper;
using Entities.Dtos;
using Entities.Exceptions;
using Entities.Models;
using Repositories.Contracts;
using Services.Contracts;

namespace Services
{
    public class WaterCardManager : IWaterCardService
    {

        private readonly IRepositoryManager _manager;
        private readonly ILoggerService _logger;
        private readonly IMapper _mapper;

        public WaterCardManager(IRepositoryManager manager, ILoggerService logger, IMapper mapper)
        {
            _manager = manager;
            _logger = logger;
            _mapper = mapper;
        }
        public async Task<WaterCardDto> CreateWaterCardAsync(WaterCardDtoForInsertion waterCardDtoForInsertion)
        {
            var entity = _mapper.Map<WaterCard>(waterCardDtoForInsertion);
            _manager.WaterCard.CreateWaterCard(entity);
            await _manager.SaveAsync();
            return _mapper.Map<WaterCardDto>(entity);
        }

        public async Task DeleteWaterCardAsync(string id, bool trackChanges)
        {
            var entity = await GetWaterCardByIdAndCheckExist(id, trackChanges);
            _manager.WaterCard.DeleteWaterCard(entity);
            await _manager.SaveAsync();
        }

        public async Task<WaterCardDto> GetWaterCardByIdAsync(string id, bool trackChanges)
        {

            var entity = await GetWaterCardByIdAndCheckExist(id, trackChanges);

            return _mapper.Map<WaterCardDto>(entity);
        }

        public async Task<(WaterCardDtoForUpdate waterCardDtoForUpdate, WaterCard waterCard)> GetWaterCardForPatchAsync(string id, bool trackChanges)
        {
            var entity = await GetWaterCardByIdAndCheckExist(id, trackChanges);

            var waterCardDtoForUpdate = _mapper.Map<WaterCardDtoForUpdate>(entity);
            return (waterCardDtoForUpdate, entity);
        }

        public async Task SaveChangesForPatchAsync(WaterCardDtoForUpdate waterCardDtoForUpdate, WaterCard waterCard)
        {
            _mapper.Map(waterCardDtoForUpdate, waterCard);
            await _manager.SaveAsync();
        }

        public async Task UpdateWaterCardAsync(string id, WaterCardDtoForUpdate waterCardDtoForUpdate, bool trackChanges)
        {
            var entity = await GetWaterCardByIdAndCheckExist(id, trackChanges);

            entity = _mapper.Map<WaterCard>(waterCardDtoForUpdate);

            _manager.WaterCard.UpdateWaterCard(entity);
            await _manager.SaveAsync();
        }

        private async Task<WaterCard> GetWaterCardByIdAndCheckExist(string id, bool trackChanges)
        {

            var entity = await _manager.WaterCard.GetWaterCardByIdAsync(id, trackChanges) ?? throw new WaterCardNotFoundException(id);

            return entity;
        }
    }
}