using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TemperatureService.Models;

namespace TemperatureService.Database
{
    public class TemperatureDbContext : DbContext
    {
        public DbSet<Temperature> Temperatures { get; set; }

        public TemperatureDbContext() : base("TemperatureDBConnectionString")
        {
        }
    }
}
