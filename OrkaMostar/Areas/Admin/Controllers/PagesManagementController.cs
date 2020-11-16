using OrkaMostar.Areas.Admin.ViewModels;
using OrkaMostar.Core;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OrkaMostar.Areas.Admin.Controllers
{
    [Authorize]
    public class PagesManagementController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;

        public PagesManagementController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: Admin/PagesManagement
        public ActionResult Index()
        {
            var model = _unitOfWork.WebsitePages.GetAllPages().Select(m => new WebsitePagesAdminViewModel()
            {
                Id = m.Id,
                MenuId = m.MenuId,
                MenuName = m.MenuName,
                ParentId = m.ParentId,
                SortOrder = m.SortOrder,
                Template = m.Template == "OnlyTextTemplate" ? "Blank Page" : m.Template,
                ParentName = m.ParentId > 0 ? _unitOfWork.WebsitePages.GetPageById(m.ParentId).MenuName : ""
            }).OrderBy(m => m.SortOrder);

            return View(model);
        }

        //public ActionResult EditWebsitePage(int id)
        //{
        //    var page = _unitOfWork.WebsitePages.GetPageById(id);

        //    var model = new EditWebsitePageAdminViewModel
        //    {
        //        ImageToShow = string.IsNullOrEmpty(page.ImagePath) ? "Areas/Admin/Content/images/upload-icon.png" : page.ImagePath + "/" + page.ImageName,
        //        Id = page.Id,
        //        isHidden = page.isHidden,
        //        MenuName = page.MenuName,
        //        MetaDescription = page.MetaDescription,
        //        MetaKeywords = page.MetaKeywords,
        //        OpenPageInNewTab = page.OpenPageInNewTab,
        //        PageExternalUrl = page.PageExternalUrl,
        //        PageTitle = page.PageTitle,
        //        PageUrl = page.PageUrl,
        //        ParentId = page.ParentId,
        //        SortOrder = page.SortOrder,
        //        Template = page.Template,
        //        Pages = _unitOfWork.WebsitePages.GetActivePagesByMenuId(page.MenuId).ToList()
        //    };

        //    return View(model);
        //}

        public PartialViewResult EditWebsitePage(int id)
        {
            var page = _unitOfWork.WebsitePages.GetPageById(id);

            var model = new EditWebsitePageAdminViewModel
            {
                ImageToShow = string.IsNullOrEmpty(page.ImagePath) ? "Areas/Admin/Content/images/upload-icon.png" : page.ImagePath + "/" + page.ImageName,
                Id = page.Id,
                isHidden = page.isHidden,
                MenuName = page.MenuName,
                MetaDescription = page.MetaDescription,
                MetaKeywords = page.MetaKeywords,
                OpenPageInNewTab = page.OpenPageInNewTab,
                PageExternalUrl = page.PageExternalUrl,
                PageTitle = page.PageTitle,
                PageUrl = page.PageUrl,
                ParentId = page.ParentId,
                SortOrder = page.SortOrder,
                Template = page.Template,
                Pages = _unitOfWork.WebsitePages.GetActivePagesByMenuId(page.MenuId).ToList()
            };

            return PartialView("~/Areas/Admin/Views/Shared/_EditWebsitePagePartial.cshtml", model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteWebsitePage(int PageIdInput)
        {
            _unitOfWork.WebsitePages.RemovePage(PageIdInput);
            _unitOfWork.Complete();

            return RedirectToAction("Index");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SaveEditedPage(EditWebsitePageAdminViewModel page)
        {
            var pageDb = _unitOfWork.WebsitePages.GetPageById(page.Id);

            var path = "~/DynamicContent/PagesImages";
            var pathToSave = "DynamicContent/PagesImages";

            pageDb.MenuName = page.MenuName;
            pageDb.MetaDescription = page.MetaDescription;
            pageDb.MetaKeywords = page.MetaKeywords;
            pageDb.OpenPageInNewTab = page.OpenPageInNewTab;
            pageDb.PageExternalUrl = page.PageExternalUrl;
            pageDb.PageTitle = page.PageTitle;
            pageDb.PageUrl = page.PageUrl;
            pageDb.ParentId = page.ParentId;
            pageDb.SortOrder = page.SortOrder;
            pageDb.isHidden = page.isHidden;
            pageDb.Template = page.Template;
            if (page.File != null)
            {
                pageDb.ImageName = page.File.FileName;
                pageDb.ImagePath = pathToSave;
                page.File.SaveAs(Path.Combine(Server.MapPath(path), page.File.FileName));
            }

            _unitOfWork.Complete();

            return RedirectToAction("Index", "PagesManagement", new { area = "Admin" });
        }
    }
}