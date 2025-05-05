using AutoMapper;
using Entities.Dtos;
using Entities.Exceptions;
using Entities.Models;
using Repositories.Contracts;
using Services.Contracts;

public class KioskManager : IKioskService
{

    private readonly IRepositoryManager _manager;
    private readonly ILoggerService _logger;
    private readonly IMapper _mapper;

    public KioskManager(IRepositoryManager manager, ILoggerService logger, IMapper mapper)
    {
        _manager = manager;
        _logger = logger;
        _mapper = mapper;
    }
    public async Task<KioskDto> GetKioskByIdAsync(string id, bool trackChanges)
    {
        var entity = await GetKioskByIdAndCheckExist(id, trackChanges);

        return _mapper.Map<KioskDto>(entity);
    }


    private async Task<Kiosk> GetKioskByIdAndCheckExist(string id, bool trackChanges)
    {

        var entity = await _manager.Kiosk.GetKioskByIdAsync(id, trackChanges);
        if (entity is null)
        {
            throw new KioskNotFoundException(id);
        }
        return entity;
    }
}