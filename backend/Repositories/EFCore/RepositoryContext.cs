﻿using System.Reflection;
using Entities.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace Repositories.EFCore
{
    // Bu class DB işlemleri yapan repositoryleri birleştiren classtır. Bu class sayesinde DB işlemlerine ulaşılabilir.
    public class RepositoryContext : IdentityDbContext<User>
    {
        public DbSet<WaterCard> WaterCards { get; set; }
        public DbSet<CityHall_WaterCompany> CityHallWaterCompanies { get; set; }
        public DbSet<Kiosk> Kiosk { get; set; }
        public DbSet<WaterCompany> WaterCompanies { get; set; }
        public DbSet<Meter> Meters { get; set; }
        public DbSet<CityHall> CityHalls { get; set; }

        public RepositoryContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ? Aşağıdai yorum satılarına hiçbir zaman gerek olmicak. tek tek configleri aktif etmek yerine en alt satırdaki kod bu işlemi tek seferde tüm modeller için yapıyor.

            // modelBuilder.ApplyConfiguration(new RoleConfig());
            // modelBuilder.ApplyConfiguration(new UserConfig());
            // modelBuilder.ApplyConfiguration(new CityHallConfig());

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        }
    }
}
