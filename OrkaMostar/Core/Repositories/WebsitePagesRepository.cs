using OrkaMostar.Core.Interfaces;
using OrkaMostar.Core.Models;
using OrkaMostar.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OrkaMostar.Core.Repositories
{
    public class WebsitePagesRepository : IWebsitePagesRepository
    {
        private readonly ApplicationDbContext _ctx;

        public WebsitePagesRepository(ApplicationDbContext ctx)
        {
            _ctx = ctx;
        }

        public void AddPage(WebsitePage page, bool isBlog = false)
        {
            string pageUrlToSave = Helpers.UrlCleaner.CleanUrl(page.MenuName);
            if (GetPageByUrl(pageUrlToSave) != null)
            {
                int randNumber = (new Random()).Next(100, 1000);
                pageUrlToSave = pageUrlToSave + randNumber.ToString();
            }
            if (page.ParentId > 0)
            {
                page.PageUrl = GetPageById(page.ParentId).PageUrl + pageUrlToSave + "/";
            }
            if (isBlog)
            {
                page.PageUrl = "/novosti/" + pageUrlToSave + "/";
            }
            else
            {
                page.PageUrl = "/" + pageUrlToSave + "/";
            }

            _ctx.WebsitePages.Add(page);
        }

        public IEnumerable<WebsitePage> GetActivePages(bool isBlog)
        {
            return _ctx.WebsitePages.Where(wp => !wp.isHidden && wp.isBlogPost == isBlog).AsEnumerable();
        }

        public IEnumerable<WebsitePage> GetPagesForSitemap()
        {
            return _ctx.WebsitePages.Where(wp => !wp.isHidden && string.IsNullOrEmpty(wp.PageExternalUrl)).AsEnumerable();
        }

        public IEnumerable<WebsitePage> GetActivePagesByMenuId(int menuId)
        {
            return _ctx.WebsitePages.Where(wp => wp.MenuId == menuId).AsEnumerable();
        }

        public IEnumerable<WebsitePage> GetAllPages(bool isBlog)
        {
            return _ctx.WebsitePages.Where(wp => wp.isBlogPost == isBlog).AsEnumerable();
        }

        public IEnumerable<WebsitePage> GetHiddenPages(bool isBlog)
        {
            return _ctx.WebsitePages.Where(wp => wp.isHidden && wp.isBlogPost == isBlog).AsEnumerable();
        }

        public WebsitePage GetPageById(int id)
        {
            return _ctx.WebsitePages.Find(id);
        }

        public WebsitePage GetPageByUrl(string url)
        {
            return _ctx.WebsitePages.Where(wp => wp.PageUrl.Equals("/" + url + "/")).FirstOrDefault();
        }

        public IEnumerable<WebsitePage> GetRelatedPages(int id, int parentId)
        {
            if (parentId == 0)
            {
                return _ctx.WebsitePages.Where(wp => wp.ParentId == id).AsEnumerable();
            }
            else
            {
                return _ctx.WebsitePages.Where(wp => wp.ParentId == parentId).AsEnumerable();
            }
        }

        public void RemovePage(int id)
        {
            WebsitePage pageToRemove = GetPageById(id);

            _ctx.WebsitePages.Remove(pageToRemove);
        }
    }
}