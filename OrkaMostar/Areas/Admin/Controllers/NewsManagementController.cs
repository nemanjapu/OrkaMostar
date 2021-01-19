using OrkaMostar.Areas.Admin.ViewModels;
using OrkaMostar.Core;
using OrkaMostar.Core.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OrkaMostar.Areas.Admin.Controllers
{
    [Authorize]
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
                isHidden = m.isHidden,
                MenuName = m.MenuName
            }).OrderBy(m => m.DateAdded);

            return PartialView("~/Areas/Admin/Views/Shared/_BlogsListPartial.cshtml", model);
        }

        public PartialViewResult EditBlogPage(int id)
        {
            var page = _unitOfWork.WebsitePages.GetPageById(id);

            var model = new EditWebsitePageAdminViewModel
            {
                ImageToShow = string.IsNullOrEmpty(page.ImageName) ? "Areas/Admin/Content/images/upload-icon.png" : page.ImagePath + "/" + page.ImageName,
                Id = page.Id,
                isHidden = page.isHidden,
                MenuName = page.MenuName,
                MetaDescription = page.MetaDescription,
                MetaKeywords = page.MetaKeywords,
                PageTitle = page.PageTitle,
                PageUrl = page.PageUrl,
                Template = page.Template,
                Content1 = page.Content1
            };

            return PartialView("~/Areas/Admin/Views/Shared/_BlogPagePartial.cshtml", model);
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
            var path = "~/DynamicContent/BlogImages";
            var pathToSave = "DynamicContent/BlogImages";
            var imageNameToSave = "";
            if (blog.File != null)
            {
                imageNameToSave = blog.File.FileName;
                blog.File.SaveAs(Path.Combine(Server.MapPath(path), blog.File.FileName));
            }
            var blogDb = new WebsitePage()
            {
                DateAdded = DateTime.Now,
                Content1 = blog.Content1,
                isBlogPost = true,
                MetaKeywords = blog.MetaKeywords,
                MetaDescription = blog.MetaDescription,
                MenuName = blog.MenuName,
                PageTitle = blog.MenuName,
                Template = "BlogPostTemplate",
                isHidden = blog.isHidden,
                MenuId = 1,
                ImageName = imageNameToSave,
                ImagePath = pathToSave
            };


            _unitOfWork.WebsitePages.AddPage(blogDb);
            _unitOfWork.Complete();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public void SaveEditedBlog(EditWebsitePageAdminViewModel blog)
        {
            var blogDb = _unitOfWork.WebsitePages.GetPageById(blog.Id);
            var path = "~/DynamicContent/BlogImages";
            var pathToSave = "DynamicContent/BlogImages";

            blogDb.MenuName = blog.MenuName;
            blogDb.PageTitle = blog.PageTitle;
            blogDb.MetaDescription = blog.MetaDescription;
            blogDb.MetaKeywords = blog.MetaKeywords;
            blogDb.Content1 = blog.Content1;
            if (blog.File != null)
            {
                blogDb.ImageName = blog.File.FileName;
                blogDb.ImagePath = pathToSave;
                blog.File.SaveAs(Path.Combine(Server.MapPath(path), blog.File.FileName));
            }

            _unitOfWork.Complete();
        }
    }
}