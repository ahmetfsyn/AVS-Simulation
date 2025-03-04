using System.Dynamic;
using AutoMapper;
using Entities.Dtos;
using Entities.Exceptions;
using Entities.LinkModels;
using Entities.Models;
using Entities.RequestFeatures;
using Repositories.Contracts;
using Services.Contracts;


namespace Services
{
    public class CityHallManager : ICityHallService
    {

        private readonly IRepositoryManager _manager;
        private readonly ILoggerService _logger;
        private readonly IMapper _mapper;
        private readonly ICityHallLinks _cityHallLinks;



        public CityHallManager(IRepositoryManager manager, ILoggerService logger, IMapper mapper, ICityHallLinks cityHallLinks)
        {
            _manager = manager;
            _logger = logger;
            _mapper = mapper;
            _cityHallLinks = cityHallLinks;
        }


        public async Task<CityHallDto> CreateCityHallAsync(CityHallDtoForInsertion cityHallDtoForInsertion)
        {
            var entity = _mapper.Map<CityHall>(cityHallDtoForInsertion);
            _manager.CityHall.CreateCityHall(entity);
            await _manager.SaveAsync();
            return _mapper.Map<CityHallDto>(entity);
        }


        public async Task DeleteCityHallAsync(int id, bool trackChanges)
        {
            var entity = await GetCityHallByIdAndCheckExist(id, trackChanges);
            _manager.CityHall.DeleteCityHall(entity);
            await _manager.SaveAsync();

        }

        public async Task<(LinkResponse linkResponse, MetaData metaData)> GetAllCityHallsAsync(LinkParameters linkParameters, bool trackChanges)
        {
            if (!linkParameters.CityHallParameters.ValidCityName)
            {
                throw new CityLengthOutOfRange();
            }

            var cityHallsWithMetaData = await _manager.CityHall.GetAllCityHallsAsync(linkParameters.CityHallParameters, trackChanges);

            var cityHallsDto = _mapper.Map<IEnumerable<CityHallDto>>(cityHallsWithMetaData);
            var links = _cityHallLinks.TryGenerateLinks(cityHallsDto, linkParameters.CityHallParameters.Fields, linkParameters.HttpContext);

            return (linkResponse: links, metaData: cityHallsWithMetaData.MetaData);
        }

        public async Task<CityHallDto> GetCityHallByIdAsync(int id, bool trackChanges)
        {
            var entity = await GetCityHallByIdAndCheckExist(id, trackChanges);


            return _mapper.Map<CityHallDto>(entity);
        }

        private async Task<CityHall> GetCityHallByIdAndCheckExist(int id, bool trackChanges)
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