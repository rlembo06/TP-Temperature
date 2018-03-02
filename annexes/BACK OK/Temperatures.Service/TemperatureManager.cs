using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Temperatures.Core.Database;
using Temperatures.Core.Models;
using Temperatures.Service.Services;

namespace Temperatures.Service
{
    class TemperatureManager
    {
        private TemperatureSerialReader TemperatureSerialReader;
        private TemperatureDbContext DbContext;

        public TemperatureManager()
        {
            this.DbContext = new TemperatureDbContext();
            this.DbContext.Database.EnsureCreated();
            this.TemperatureSerialReader = new TemperatureSerialReader(TemperatureReceived);
        }

        public void StartListenAndStore()
        {
            Console.WriteLine("Start Listening...");
            this.DbContext = new TemperatureDbContext();
            this.TemperatureSerialReader = new TemperatureSerialReader(TemperatureReceived);
            this.TemperatureSerialReader.Open();
        }

        public void Stop()
        {
            this.TemperatureSerialReader.Close();
            this.DbContext.Dispose();
        }

        private void TemperatureReceived(Temperature temperature)
        {
            Console.WriteLine("Writing frame to db");
            DbContext.Temperatures.Add(temperature);
            DbContext.SaveChanges();
        }
    }

}
