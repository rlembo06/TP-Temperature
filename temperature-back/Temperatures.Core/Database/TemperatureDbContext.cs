using System.Data.Entity;
using Temperatures.Core.Models;

namespace Temperatures.Core.Database
{
    public class TemperatureDbContext : DbContext
    {
        public DbSet<Temperature> Temperatures { get; set; }

        public TemperatureDbContext() : base("TemperatureDBConnectionString")
        {
        }
    }
}
