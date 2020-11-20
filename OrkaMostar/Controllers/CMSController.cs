using OrkaMostar.Core;
using OrkaMostar.Core.Models;
using OrkaMostar.Core.ViewModels;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Xml.Linq;

namespace OrkaMostar.Controllers
{
    public class CMSController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;

        public CMSController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        #region Sitemap

        public class SitemapNode
        {
            public SitemapFrequency? Frequency { get; set; }
            public DateTime? LastModified { get; set; }
            public double? Priority { get; set; }
            public string Url { get; set; }
        }

        public enum SitemapFrequency
        {
            Never,
            Yearly,
            Monthly,
            Weekly,
            Daily,
            Hourly,
            Always
        }

        public IReadOnlyCollection<SitemapNode> GetSitemapNodes(UrlHelper urlHelper)
        {
            List<SitemapNode> nodes = new List<SitemapNode>();

            var items = _unitOfWork.WebsitePages.GetPagesForSitemap().Select(l => new
            {
                url = l.PageUrl
            }).ToList();
            foreach (var item in items)
            {
                nodes.Add(
                   new SitemapNode()
                   {
                       Url = "https://www.orkamostar.ba" + item.url,
                       Frequency = SitemapFrequency.Weekly,
                       Priority = 1
                   });
            }

            return nodes;
        }

        public string GetSitemapDocument(IEnumerable<SitemapNode> sitemapNodes)
        {
            XNamespace xmlns = "http://www.sitemaps.org/schemas/sitemap/0.9";
            XElement root = new XElement(xmlns + "urlset");

            foreach (SitemapNode sitemapNode in sitemapNodes)
            {
                XElement urlElement = new XElement(
                    xmlns + "url",
                    new XElement(xmlns + "loc", Uri.EscapeUriString(sitemapNode.Url)),
                    sitemapNode.LastModified == null ? null : new XElement(
                        xmlns + "lastmod",
                        sitemapNode.LastModified.Value.ToLocalTime().ToString("yyyy-MM-ddTHH:mm:sszzz")),
                    sitemapNode.Frequency == null ? null : new XElement(
                        xmlns + "changefreq",
                        sitemapNode.Frequency.Value.ToString().ToLowerInvariant()),
                    sitemapNode.Priority == null ? null : new XElement(
                        xmlns + "priority",
                        sitemapNode.Priority.Value.ToString("F1", CultureInfo.InvariantCulture)));
                root.Add(urlElement);
            }

            XDocument document = new XDocument(root);
            return document.ToString();
        }

        public ActionResult SitemapXml()
        {
            var sitemapNodes = GetSitemapNodes(this.Url);
            string xml = GetSitemapDocument(sitemapNodes);
            return this.Content(xml, "xml", Encoding.UTF8);
        }

        #endregion

        //[HtmlActionFilter]
        public ActionResult ReturnCMSPage(string url)
        {
            var websitePageDB = HttpContext.Items["cmspage"] as WebsitePage;

            var websitePageToRedirectTo = new PageContentViewModel()
            {
                Content1 = websitePageDB.Content1,
                Content2 = websitePageDB.Content2,
                Content3 = websitePageDB.Content3,
                Content4 = websitePageDB.Content4,
                Content5 = websitePageDB.Content5,
                MetaDescription = websitePageDB.MetaDescription,
                MetaKeywords = websitePageDB.MetaKeywords,
                PageUrl = websitePageDB.PageUrl,
                PageTitle = websitePageDB.PageTitle,
                RelatedPages = _unitOfWork.WebsitePages.GetRelatedPages(websitePageDB.Id, websitePageDB.ParentId).ToList()
            };

            string template = websitePageDB.Template;
            return View(template, websitePageToRedirectTo);
        }

        public ActionResult GetSocialMedia()
        {
            var model = _unitOfWork.GlobalSettings.GetGlobalValues();

            return PartialView("_SocialMediaPartial", model);
        }

        public ActionResult GetTopMenuItems()
        {
            var dbPage = _unitOfWork.WebsitePages.GetActivePagesByMenuId(1).OrderBy(m => m.SortOrder).ThenBy(m => m.Id);

            var model = dbPage.Select(m => new MenuItemsViewModel
            {
                ParentId = m.ParentId,
                Id = m.Id,
                isHidden = m.isHidden,
                MenuName = m.MenuName,
                OpenPageInNewTab = m.OpenPageInNewTab,
                PageUrl = m.PageUrl,
                PageExternalUrl = m.PageExternalUrl,
                hasChildren = false
            }).ToList();

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

            return PartialView("_MenuPartial", model);
        }
    }
}