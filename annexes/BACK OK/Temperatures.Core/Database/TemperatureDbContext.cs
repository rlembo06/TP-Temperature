using Microsoft.EntityFrameworkCore;
using Temperatures.Core.Models;

namespace Temperatures.Core.Database
{
    public class TemperatureDbContext : DbContext
    {
        public static string ConnectionString = @"Data Source=C:\temperatures.db";

        public DbSet<Temperature> Temperatures { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(ConnectionString);
        }
    }
}
