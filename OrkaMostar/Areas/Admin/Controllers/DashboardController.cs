using OrkaMostar.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OrkaMostar.Areas.Admin.Controllers
{
    [Authorize]
    public class DashboardController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;

        public DashboardController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: Admin/Dashboard
        public ActionResult Index()
        {
            var model = _unitOfWork.Leads.GetAllLeads().OrderByDescending(l => l.Date);
            return View(model);
        }
    }
}