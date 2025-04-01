using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Contracts;

namespace Repositories.EFCore
{
    public class WaterCardRepository : RepositoryBase<WaterCard>, IWaterCardRepository
    {
        public WaterCardRepository(RepositoryContext context) : base(context)
        {
        }

        public void CreateWaterCard(WaterCard waterCard)
        {
            Create(waterCard);
        }

        public void DeleteWaterCard(WaterCard waterCard)
        {
            Delete(waterCard);
        }

        public void UpdateWaterCard(WaterCard waterCard)
        {
            Update(waterCard);
        }

        public async Task<WaterCard> GetWaterCardByIdAsync(string id, bool trackChanges)
        {
            return await FindByCondition(waterCard => waterCard.Id.Equals(id), trackChanges)
            .SingleOrDefaultAsync();

        }


    }
}