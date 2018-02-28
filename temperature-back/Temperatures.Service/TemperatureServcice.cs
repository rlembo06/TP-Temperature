using System.ServiceProcess;
using Temperatures.Core.Database;
using Temperatures.Core.Models;
using Temperatures.Service.Services;

namespace Temperatures.Service
{
    public partial class TemperatureServcice : ServiceBase
    {
        private TemperatureReader TemperatureReader;
        private TemperatureDbContext DbContext;

        public TemperatureServcice()
        {
            this.InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            DbContext = new TemperatureDbContext();
            TemperatureReader = new TemperatureReader(TemperatureReceived);
            TemperatureReader.Open();
        }

        protected void TemperatureReceived(Temperature temperature)
        {
            DbContext.Temperatures.Add(temperature);
            DbContext.SaveChanges();
        }

        protected override void OnStop()
        {
            TemperatureReader.Close();
            DbContext.Dispose();
        }
    }
}
