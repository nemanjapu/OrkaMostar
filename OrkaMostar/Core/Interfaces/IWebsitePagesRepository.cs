﻿using OrkaMostar.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrkaMostar.Core.Interfaces
{
    public interface IWebsitePagesRepository
    {
        IEnumerable<WebsitePage> GetAllPages(bool isBlog);
        IEnumerable<WebsitePage> GetActivePages(bool isBlog);
        IEnumerable<WebsitePage> GetPagesForSitemap();
        IEnumerable<WebsitePage> GetActivePagesByMenuId(int menuId);
        IEnumerable<WebsitePage> GetHiddenPages(bool isBlog);
        IEnumerable<WebsitePage> GetBlogPages(int numberOfPosts);
        WebsitePage GetPageById(int id);
        WebsitePage GetPageByUrl(string url);
        void SetPagesOrder(IEnumerable<WebsitePage> pages);
        void AddPage(WebsitePage page);
        void RemovePage(int id);
    }
}
