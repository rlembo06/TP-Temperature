using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Temperatures.Core.Database;
using Temperatures.Core.Models;

namespace Temperatures.Rest.Controllers
{
    [Route("api/[controller]")]
    public class TemperaturesController : Controller
    {
        private TemperatureDbContext DbContext { get; set; }

        public TemperaturesController(TemperatureDbContext dbContext)
        {
            this.DbContext = dbContext;
        }

        // GET api/values
        [HttpGet]
        [EnableCors("AllowCors")]
        public Task<List<Temperature>> Get()
        {
            return this.DbContext.Temperatures.ToListAsync();
        }

        [HttpGet("paged/{page}")]
        [EnableCors("AllowCors")]
        public Task<List<Temperature>> GetPaged(int page)
        {
            int pageSize = 10;
            return this.DbContext.Temperatures.Skip(pageSize * (page - 1)).Take(pageSize).ToListAsync();
        }
    }
}
