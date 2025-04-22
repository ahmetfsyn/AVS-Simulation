
using AutoMapper;
using Entities.Dtos;
using Entities.Exceptions;
using Entities.Models;
using Repositories.Contracts;
using Services.Contracts;

namespace Services
{
    public class CityHallManager : ICityHallService
    {

        private readonly IRepositoryManager _manager;
        private readonly ILoggerService _logger;
        private readonly IMapper _mapper;

        public CityHallManager(IRepositoryManager manager, ILoggerService logger, IMapper mapper)
        {
            _manager = manager;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<CityHallDto> GetCityHallByIdAsync(string id, bool trackChanges)
        {
            var entity = await GetCityHallByIdAndCheckExist(id, trackChanges);

            return _mapper.Map<CityHallDto>(entity);
        }

        private async Task<CityHall> GetCityHallByIdAndCheckExist(string id, bool trackChanges)
        {

            var entity = await _manager.CityHall.GetCityHallByIdAsync(id, trackChanges);
            if (entity is null)
            {
                throw new CityHallNotFoundException(id);
            }
            return entity;
        }
    }
}