using OrkaMostar.Core.Interfaces;
using OrkaMostar.Core.Models;
using OrkaMostar.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OrkaMostar.Core.Repositories
{
    public class LeadsRepository : ILeadsRepository
    {
        private readonly ApplicationDbContext _ctx;

        public LeadsRepository(ApplicationDbContext ctx)
        {
            _ctx = ctx;
        }

        public void AddNewLead(Lead lead)
        {
            _ctx.Leads.Add(lead);
        }

        public void DeleteLead(int id)
        {
            var lead = GetLeadById(id);
            _ctx.Leads.Remove(lead);
        }

        public IEnumerable<Lead> GetAllLeads()
        {
            return _ctx.Leads.OrderByDescending(l => l.Date);
        }

        public Lead GetLeadById(int id)
        {
            return _ctx.Leads.Find(id);
        }
    }
}