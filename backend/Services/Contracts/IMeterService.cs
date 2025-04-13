

using Entities.Dtos;
using Entities.LinkModels;
using Entities.RequestFeatures;

namespace Services.Contracts
{
    public interface IMeterService
    {
        Task<(LinkResponse linkResponse, MetaData metaData)> GetAllMetersAsync(LinkParameters linkParameters, bool trackChanges);
    }
}