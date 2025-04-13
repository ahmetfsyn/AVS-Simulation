
using AutoMapper;
using Entities.Dtos;
using Entities.LinkModels;
using Entities.RequestFeatures;
using Repositories.Contracts;
using Services.Contracts;

namespace Services
{
    public class MeterManager : IMeterService
    {

        private readonly IRepositoryManager _manager;
        private readonly ILoggerService _logger;
        private readonly IMapper _mapper;
        private readonly IMeterLinks _meterLinks;

        public MeterManager(IRepositoryManager manager, ILoggerService logger, IMapper mapper, IMeterLinks meterLinks)
        {
            _manager = manager;
            _logger = logger;
            _mapper = mapper;
            _meterLinks = meterLinks;
        }

        public async Task<(LinkResponse linkResponse, MetaData metaData)> GetAllMetersAsync(LinkParameters linkParameters, bool trackChanges)
        {
            var metersWithMetaData = await _manager.Meter.GetAllMetersAsync(linkParameters.MeterParameters, trackChanges);

            var meters = metersWithMetaData; // Raw Meter entity list

            var waterCompanies = await _manager.WaterCompany.GetWaterCompaniesAsync(trackChanges);

            // Manual DTO mapping with water company name
            var metersDto = meters.Select(meter =>
            {
                var dto = _mapper.Map<MeterDto>(meter);
                var matchedCompany = waterCompanies.FirstOrDefault(c => c.Id == meter.WaterCompanyId);
                dto.WaterCompanyName = matchedCompany?.Name;
                return dto;
            }).ToList();

            var links = _meterLinks.TryGenerateLinks(metersDto, linkParameters.MeterParameters.Fields, linkParameters.HttpContext);

            return (linkResponse: links, metaData: metersWithMetaData.MetaData);
        }
    }
}