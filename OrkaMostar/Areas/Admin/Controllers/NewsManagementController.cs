using OrkaMostar.Areas.Admin.ViewModels;
using OrkaMostar.Core;
using OrkaMostar.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OrkaMostar.Areas.Admin.Controllers
{
    public class NewsManagementController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;

        public NewsManagementController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: Admin/PagesManagement
        public ActionResult Index()
        {
            return View();
        }

        public PartialViewResult LoadAllBlogs()
        {
            var model = _unitOfWork.WebsitePages.GetAllPages(true).Select(m => new WebsitePagesAdminViewModel()
            {
                Id = m.Id,
                DateAdded = m.DateAdded,
                isHidden = m.isHidden
            }).OrderBy(m => m.DateAdded);

            return PartialView("~/Areas/Admin/Views/Shared/_BlogsListPartial.cshtml", model);
        }

        public PartialViewResult EditBlogPage(int id)
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
                PageTitle = page.PageTitle,
                PageUrl = page.PageUrl,
                Template = page.Template,
                Pages = _unitOfWork.WebsitePages.GetActivePagesByMenuId(page.MenuId).ToList()
            };

            return PartialView("~/Areas/Admin/Views/Shared/_EditWebsitePagePartial.cshtml", model);
        }

        public PartialViewResult AddNewBlogPage()
        {
            var model = new EditWebsitePageAdminViewModel();

            return PartialView("~/Areas/Admin/Views/Shared/_BlogPagePartial.cshtml", model);
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
        public void SaveNewBlog(EditWebsitePageAdminViewModel blog)
        {
            var blogDb = new WebsitePage()
            {
                DateAdded = blog.DateAdded == null ? DateTime.Now : blog.DateAdded,
                Content1 = blog.Content1,
                isBlogPost = true,
                MetaKeywords = blog.MetaKeywords,
                MetaDescription = blog.MetaDescription,
                MenuName = blog.MenuName,
                PageTitle = blog.MenuName,
                Template = "BlogPostTemplate",
                isHidden = blog.isHidden
            };

            _unitOfWork.Complete();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public void SaveEditedBlog(EditWebsitePageAdminViewModel page)
        {
            var blogDb = _unitOfWork.WebsitePages.GetPageById(page.Id);

            blogDb.MenuName = page.MenuName;
            blogDb.MetaDescription = page.MetaDescription;
            blogDb.MetaKeywords = page.MetaKeywords;
            blogDb.OpenPageInNewTab = page.OpenPageInNewTab;
            blogDb.PageExternalUrl = page.PageExternalUrl;
            blogDb.PageTitle = page.PageTitle;
            blogDb.PageUrl = page.PageUrl;
            blogDb.ParentId = page.ParentId;
            blogDb.SortOrder = page.SortOrder;
            blogDb.isHidden = page.isHidden;
            blogDb.Template = page.Template;

            _unitOfWork.Complete();
        }
    }
}