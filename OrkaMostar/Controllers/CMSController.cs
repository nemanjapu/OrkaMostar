using OrkaMostar.Core;
using OrkaMostar.Core.Models;
using OrkaMostar.Core.ViewModels;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Mail;
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

        public ActionResult ReturnCMSPage()
        {
            var websitePageDB = HttpContext.Items["cmspage"] as WebsitePage;

            var websitePageToRedirectTo = new PageContentViewModel()
            {
                Id = websitePageDB.Id,
                Content1 = websitePageDB.Content1,
                Content2 = websitePageDB.Content2,
                Content3 = websitePageDB.Content3,
                Content4 = websitePageDB.Content4,
                Content5 = websitePageDB.Content5,
                MetaDescription = websitePageDB.MetaDescription,
                MetaKeywords = websitePageDB.MetaKeywords,
                PageUrl = websitePageDB.PageUrl,
                MenuName = websitePageDB.MenuName,
                PageTitle = websitePageDB.PageTitle,
                BlogPages = _unitOfWork.WebsitePages.GetBlogPages(0).ToList()
            };

            string template = websitePageDB.Template;
            return View(template, websitePageToRedirectTo);
        }

        public ActionResult ToggleContentEditor()
        {
            if ((string)Session["ContentEditor"] == "yes"){
                Session["ContentEditor"] = "";
            }
            else
            {
                Session["ContentEditor"] = "yes";
            }

            return Redirect(Request.UrlReferrer.ToString());
        }

        [HttpPost]
        public void SaveCMSPageContent(PageContentViewModel model)
        {
            var websitePageDb = _unitOfWork.WebsitePages.GetPageById(model.Id);

            websitePageDb.Content1 = model.Content1;

            _unitOfWork.Complete();
        }

        [HttpPost]
        public string SendMessage(FormCollection collection)
        {
            var model = new Lead();
            model.FirstName = collection["FirstName"];
            model.LastName = collection["LastName"];
            model.PhoneNumber = collection["PhoneNumber"];
            model.EmailAddress = collection["EmailAddress"];
            model.Note = collection["Note"];
            model.Date = DateTime.Now;

            _unitOfWork.Leads.AddNewLead(model);
            _unitOfWork.Complete();

            string HostMail = "postmaster@struix.co";
            string HostPassword = "StruiXTeaM12#$";
            string DisplayName = "Orka Notification System";
            MailMessage eMailMessage = new MailMessage();
            eMailMessage.To.Add("nemanja.pu@gmail.com");
            eMailMessage.From = new MailAddress(HostMail, DisplayName);

            string subject = "Nova poruka - Orka Mostar";
            string body = "<p>Ime i prezime: <b>" + model.FirstName + " " + model.LastName + "</b></p><p>Email adresa: <b>" + model.EmailAddress + "</b></p><p>Broj telefona: <b>" + model.PhoneNumber + "</b></p><p>Poruka: <b>" + model.Note + "</b></p>";

            eMailMessage.Subject = subject;
            eMailMessage.Body = body;
            eMailMessage.IsBodyHtml = true;

            using (SmtpClient smtp = new SmtpClient())
            {
                smtp.EnableSsl = false;
                smtp.Host = "mail.struix.co";
                smtp.Port = 8889;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential(HostMail, HostPassword);
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.SendCompleted += (s, e) => { smtp.Dispose(); };
                smtp.Send(eMailMessage);
            };

            string message = "<div class='col-12 py-5'><p class='text-white text-center my-5'>Hvala na vašoj poruci!</p></div>";

            return message;
        }

        public ActionResult GetSocialMedia()
        {
            var model = _unitOfWork.GlobalSettings.GetGlobalValues();

            return PartialView("_SocialMediaPartial", model);
        }

        public ActionResult GetTopMenuItems()
        {
            var dbPage = _unitOfWork.WebsitePages.GetActivePages(false).OrderBy(m => m.SortOrder).ThenBy(m => m.Id);

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

        public ActionResult GetFooter()
        {
            var dbPage = _unitOfWork.WebsitePages.GetActivePages(false).OrderBy(m => m.SortOrder).ThenBy(m => m.Id);

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

            return PartialView("_FooterPartial", model);
        }
    }
}