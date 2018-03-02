using System;
using System.ServiceProcess;

namespace Temperatures.Service
{
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        static void Main(string[] args)
        {
            if (args.Length > 0 && args[0] == "/run")
            {
                var temperatureManager = new TemperatureManager();
                temperatureManager.StartListenAndStore();
                Console.WriteLine("Service Started...");
                Console.ReadKey();
            }
            else
            {
                var ServicesToRun = new ServiceBase[]
                {
                    new TemperatureService()
                };
                ServiceBase.Run(ServicesToRun);
            }
        }
    }
}
