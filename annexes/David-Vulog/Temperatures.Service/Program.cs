using System.ServiceProcess;

namespace Temperatures.Service
{
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        static void Main()
        {
            var ServicesToRun = new ServiceBase[]
            {
                new TemperatureServcice()
            };
            ServiceBase.Run(ServicesToRun);
        }
    }
}
