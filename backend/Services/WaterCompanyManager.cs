
using AutoMapper;
using Entities.Dtos;
using Entities.Exceptions;
using Entities.Models;
using Repositories.Contracts;
using Services.Contracts;
namespace Services
{
    public class WaterCompanyManager : IWaterCompanyService
    {

        private readonly IRepositoryManager _manager;
        private readonly ILoggerService _logger;
        private readonly IMapper _mapper;

        public WaterCompanyManager(IRepositoryManager manager, ILoggerService logger, IMapper mapper)
        {
            _manager = manager;
            _logger = logger;
            _mapper = mapper;
        }
        public async Task<IEnumerable<WaterCompanyDto>> GetWaterCompaniesAsync(bool trackChanges)
        {
            var entities = await _manager.WaterCompany.GetWaterCompaniesAsync(trackChanges);

            var waterCompanyDtos = _mapper.Map<IEnumerable<WaterCompanyDto>>(entities);

            return waterCompanyDtos;
        }
    }
}