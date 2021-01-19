using OrkaMostar.Areas.Admin.ViewModels;
using OrkaMostar.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OrkaMostar.Areas.Admin.Controllers
{
    [Authorize]
    public class GlobalSettingsController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;

        public GlobalSettingsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: Admin/GlobalSettings
        public ActionResult Index()
        {
            var gv = _unitOfWork.GlobalSettings.GetGlobalValues();

            var model = new GlobalValuesViewModel()
            {
                Address = gv.Address,
                EmailAddress = gv.EmailAddress,
                FacebookLink = gv.FacebookLink,
                GooglePlusLink = gv.GooglePlusLink,
                Id = gv.Id,
                InstagramLink = gv.InstagramLink,
                LinkedinLink = gv.LinkedinLink,
                MobilePhone = gv.MobilePhone,
                OfficePhone = gv.OfficePhone,
                PinterestLink = gv.PinterestLink,
                TwitterLink = gv.TwitterLink,
                YoutubeLink = gv.YoutubeLink
            };

            return View(model);
        }

        public void SaveSettings(GlobalValuesViewModel m)
        {
            var gs = _unitOfWork.GlobalSettings.GetGlobalValues();

            gs.Address = m.Address;
            gs.EmailAddress = m.EmailAddress;
            gs.FacebookLink = m.FacebookLink;
            gs.GooglePlusLink = m.GooglePlusLink;
            gs.InstagramLink = m.InstagramLink;
            gs.LinkedinLink = m.LinkedinLink;
            gs.MobilePhone = m.MobilePhone;
            gs.OfficePhone = m.OfficePhone;
            gs.PinterestLink = m.PinterestLink;
            gs.TwitterLink = m.TwitterLink;
            gs.YoutubeLink = m.YoutubeLink;

            _unitOfWork.Complete();

        }
    }
}