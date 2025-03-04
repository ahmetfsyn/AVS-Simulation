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

        public CityHall CreateCityHall(CityHall cityHall)
        {
            _manager.CityHall.CreateCityHall(cityHall);
            _manager.SaveAsync();
            return cityHall;
        }

        public void DeleteCityHall(int id, bool trackChanges)
        {
            var entity = _manager.CityHall.GetCityHallById(id, trackChanges);
            if (entity is null)
            {
                throw new CityHallNotFoundException(id);
            }
            _manager.CityHall.DeleteCityHall(entity);
            _manager.SaveAsync();
        }

        public IEnumerable<CityHall> GetAllCityHalls(bool trackChanges)
        {
            return _manager.CityHall.GetAllCityHalls(trackChanges);
        }

        public CityHall GetCityHallById(int id, bool trackChanges)
        {
            var cityHall = _manager.CityHall.GetCityHallById(id, trackChanges);

            if (cityHall is null)
            {
                throw new CityHallNotFoundException(id);
            }

            return cityHall;
        }
    }
}