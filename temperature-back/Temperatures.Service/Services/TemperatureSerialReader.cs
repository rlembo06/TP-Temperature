using System;
using System.Globalization;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using Temperatures.Core.Models;

namespace Temperatures.Service.Services
{
    public class TemperatureSerialReader : IDisposable
    {
        private const string SerialPortNumber = "COM3";
        private readonly SerialPort _serialPort;

        private readonly StringBuilder _buffer = new StringBuilder();

        public TemperatureSerialReader(Action<Temperature> dataDelegate)
        {
            this._serialPort = new SerialPort(SerialPortNumber)
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
                    var completeFrame = this._buffer.ToString();
                    Console.WriteLine("Received frame:" + completeFrame);
                    var temperature = this.StringToTemperature(completeFrame);
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

            // split 00.00C 00.00V  ?
            var result = data.Trim().Split(' ');

            // first is degres second is volt
            var unparsedDegres = result.Length > 0 ? result[0] : result.First();
            var unparsedVolt = result.Length > 1 ? result[1] : string.Empty;

            if (unparsedDegres.Contains("C"))
            {
                var parsedData = regex.Match(unparsedDegres);
                degres = Double.Parse(parsedData.Value, CultureInfo.InvariantCulture);
            }

            if (unparsedVolt.Contains("V"))
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
            try
            {
                this._serialPort.Open();
            }
            catch
            {
                Console.WriteLine($"Can't connect to serial port {SerialPortNumber}");
            }
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
