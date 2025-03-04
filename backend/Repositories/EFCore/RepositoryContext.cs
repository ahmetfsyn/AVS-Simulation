using System.ComponentModel.DataAnnotations;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.EFCore.Config;


namespace Repositories.EFCore
{

    // Bu class DB işlemleri yapan repositoryleri birleştiren classtır. Bu class sayesinde DB işlemlerine ulaşılabilir.
    public class RepositoryContext : DbContext

    {
        public DbSet<User> Users { get; set; }
        public DbSet<CityHall> CityHalls { get; set; }

        public RepositoryContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserConfig());
            modelBuilder.ApplyConfiguration(new CityHallConfig());

        }
    }
}
