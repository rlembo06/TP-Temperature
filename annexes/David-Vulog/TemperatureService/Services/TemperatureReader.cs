using System;
using System.Collections.Generic;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TemperatureService.Models;

namespace TemperatureService.Services
{
    public class TemperatureReader : IDisposable
    {
        private readonly SerialPort serialPort;
        private Action<Temperature> dataDelegate;

        public TemperatureReader(Func<Temperature> dataDelegate)
        {
            serialPort = new SerialPort("COM3")
            {
                BaudRate = 9600,
                Parity = Parity.None,
                StopBits = StopBits.One,
                DataBits = 8,
                Handshake = Handshake.None,
                RtsEnable = true
            };

            serialPort.DataReceived += (object sender, SerialDataReceivedEventArgs e) =>
            {
                SerialPort sp = (SerialPort)sender;
                string indata = sp.ReadExisting();
                Console.Write(indata);

                // parse
                //Regex regex = new Regex(@"\d+");

                //double temperature = -1;
                //var result = indata.Split(' ');
                //foreach (var data in result)
                //{
                //    if (data.Contains("C"))
                //    {
                //        var parsedData = regex.Match(data);
                //        temperature = Double.Parse(parsedData.Value, CultureInfo.InvariantCulture);
                //    }
                //}

                //Console.WriteLine("parsed : " + temperature);

                dataDelegate(new Temperature());
            };
        }

        public void Open()
        {
            serialPort.Open();
        }

        private void Close()
        {
            serialPort.Close();
  
        }

        public void Dispose()
        {
            serialPort.Dispose();
        }

    }
}
