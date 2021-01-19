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
            return View();
        }

        public PartialViewResult LoadAllPages()
        {
            var model = _unitOfWork.WebsitePages.GetAllPages(false).Select(m => new WebsitePagesAdminViewModel()
            {
                Id = m.Id,
                MenuId = m.MenuId,
                MenuName = m.MenuName,
                ParentId = m.ParentId,
                SortOrder = m.SortOrder,
                isHidden = m.isHidden,
                Template = m.Template == "OnlyTextTemplate" ? "Blank Page" : m.Template,
                hasChildren = false
            }).OrderBy(m => m.SortOrder);

            foreach (var page in model)
            {
                int pageId = page.Id;
                foreach (var page2 in model)
                {
                    if (page2.ParentId == pageId)
                    {
                        page.hasChildren = true;
                        break;
                    }
                }
            }

            return PartialView("~/Areas/Admin/Views/Shared/_PagesListPartial.cshtml", model);
        }

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
                Pages = _unitOfWork.WebsitePages.GetAllPages(false).ToList()
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
        public void SaveEditedPage(EditWebsitePageAdminViewModel page)
        {
            var pageDb = _unitOfWork.WebsitePages.GetPageById(page.Id);

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

            _unitOfWork.Complete();
        }
    }
}