using System;

namespace Temperatures.Core.Models
{
    public class Temperature
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public double Value { get; set; }
        public double Voltage { get; set; }
    }
}
