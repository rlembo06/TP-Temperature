using System.ServiceProcess;
using Temperatures.Core.Database;
using Temperatures.Core.Models;
using Temperatures.Service.Services;

namespace Temperatures.Service
{
    public partial class TemperatureService : ServiceBase
    {
        private TemperatureManager _temperatureManager;

        public TemperatureService()
        {
            this.InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            this._temperatureManager = new TemperatureManager();
            this._temperatureManager.StartListenAndStore();
        }

        protected override void OnStop()
        {
            this._temperatureManager?.Stop();
        }
    }
}
