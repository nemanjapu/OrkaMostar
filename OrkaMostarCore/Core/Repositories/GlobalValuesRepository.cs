using OrkaMostar.Core.Interfaces;
using OrkaMostar.Core.Models;
using OrkaMostar.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OrkaMostar.Core.Repositories
{
    public class GlobalValuesRepository : IGlobalSettingsRepository
    {
        private readonly ApplicationDbContext _ctx;

        public GlobalValuesRepository(ApplicationDbContext ctx)
        {
            _ctx = ctx;
        }

        public GlobalValues GetGlobalValues()
        {
            return _ctx.GlobalValues.FirstOrDefault();
        }
    }
}