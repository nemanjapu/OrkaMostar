using OrkaMostar.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OrkaMostar.Core.ViewModels
{
    public class PageContentViewModel
    {
        public int Id { get; set; }
        public string PageTitle { get; set; }
        public string MenuName { get; set; }
        public string MetaDescription { get; set; }
        public string MetaKeywords { get; set; }
        public string ImageToShow { get; set; }
        public string PageUrl { get; set; }
        public bool isBlogPost { get; set; }

        public IEnumerable<WebsitePage> BlogPages { get; set; }

        /*Page contents*/
        [AllowHtml]
        public string Content1 { get; set; }
        [AllowHtml]
        public string Content2 { get; set; }
        [AllowHtml]
        public string Content3 { get; set; }
        [AllowHtml]
        public string Content4 { get; set; }
        [AllowHtml]
        public string Content5 { get; set; }
        [AllowHtml]
        public string Content6 { get; set; }
        [AllowHtml]
        public string Content7 { get; set; }
        [AllowHtml]
        public string Content8 { get; set; }
        [AllowHtml]
        public string Content9 { get; set; }
        [AllowHtml]
        public string Content10 { get; set; }
        [AllowHtml]
        public string Content11 { get; set; }
        [AllowHtml]
        public string Content12 { get; set; }
        [AllowHtml]
        public string Content13 { get; set; }
        [AllowHtml]
        public string Content14 { get; set; }
        [AllowHtml]
        public string Content15 { get; set; }
        [AllowHtml]
        public string Content16 { get; set; }
        [AllowHtml]
        public string Content17 { get; set; }
        [AllowHtml]
        public string Content18 { get; set; }
        [AllowHtml]
        public string Content19 { get; set; }
        [AllowHtml]
        public string Content20 { get; set; }
        [AllowHtml]
        public string Content21 { get; set; }
        [AllowHtml]
        public string Content22 { get; set; }
        [AllowHtml]
        public string Content23 { get; set; }
        [AllowHtml]
        public string Content24 { get; set; }
        [AllowHtml]
        public string Content25 { get; set; }
        [AllowHtml]
        public string Content26 { get; set; }
        [AllowHtml]
        public string Content27 { get; set; }
        [AllowHtml]
        public string Content28 { get; set; }
        [AllowHtml]
        public string Content29 { get; set; }
        [AllowHtml]
        public string Content30 { get; set; }
    }
}