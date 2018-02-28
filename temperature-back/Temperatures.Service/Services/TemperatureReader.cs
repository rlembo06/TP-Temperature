using System;
using System.Globalization;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using Temperatures.Core.Models;

namespace Temperatures.Service.Services
{
    public class TemperatureReader : IDisposable
    {
        private readonly SerialPort _serialPort;

        private readonly StringBuilder _buffer = new StringBuilder();

        public TemperatureReader(Action<Temperature> dataDelegate)
        {
            this._serialPort = new SerialPort("COM3")
            {
                BaudRate = 9600,
                Parity = Parity.None,
                StopBits = StopBits.One,
                DataBits = 8,
                Handshake = Handshake.None,
                RtsEnable = true
            };

            this._serialPort.DataReceived += (object sender, SerialDataReceivedEventArgs e) =>
            {
                SerialPort sp = (SerialPort)sender;
                string dataStream = sp.ReadExisting();
                this._buffer.Append(dataStream);
                if (dataStream.Contains("\n"))
                {
                    var temperature = this.StringToTemperature(this._buffer.ToString());
                    this._buffer.Clear();

                    dataDelegate(temperature);
                }
            };
        }

        private Temperature StringToTemperature(string data)
        {
            // parse
            Regex regex = new Regex(@"\d+(\.\d{1,2})?");

            double degres = -1;
            double volt = -1;
            var result = data.Trim().Split(' ');
            var unparsedDegres = result.First();
            var unparsedVolt = result.Last();

            if (unparsedDegres.Contains("C"))
            {
                var parsedData = regex.Match(unparsedDegres);
                degres = Double.Parse(parsedData.Value, CultureInfo.InvariantCulture);
            }

            if (unparsedDegres.Contains("V"))
            {
                var parsedData = regex.Match(unparsedVolt);
                volt = Double.Parse(parsedData.Value, CultureInfo.InvariantCulture);
            }

            return new Temperature
            {
                Date = DateTime.Now,
                Value = degres,
                Voltage = volt
            };
        }

        public void Open()
        {
            this._serialPort.Open();
        }

        public void Close()
        {
            this._serialPort.Close();
  
        }

        public void Dispose()
        {
            this._serialPort.Dispose();
        }

    }
}
