using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Contracts;

namespace Repositories.EFCore.Extensions
{
    public class WaterCompanyRepository : RepositoryBase<WaterCompany>, IWaterCompanyRepository
    {
        public WaterCompanyRepository(RepositoryContext context) : base(context)
        {
        }

        public async Task<IEnumerable<WaterCompany>> GetWaterCompaniesAsync(bool trackChanges)
        {
            return await FindAll(trackChanges).ToListAsync();
        }
    }
}