using OrkaMostar.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OrkaMostar.Core.ViewModels
{
    public class PageContentViewModel
    {
        public string PageTitle { get; set; }
        public string MetaDescription { get; set; }
        public string MetaKeywords { get; set; }
        public string ImageToShow { get; set; }
        public string PageUrl { get; set; }
        public bool isBlogPost { get; set; }

        public IEnumerable<WebsitePage> RelatedPages { get; set; }

        /*Page contents*/

        public string Content1 { get; set; }
        public string Content2 { get; set; }
        public string Content3 { get; set; }
        public string Content4 { get; set; }
        public string Content5 { get; set; }
        public string Content7 { get; set; }
        public string Content8 { get; set; }
        public string Content9 { get; set; }
        public string Content10 { get; set; }
        public string Content11 { get; set; }
        public string Content12 { get; set; }
        public string Content13 { get; set; }
        public string Content14 { get; set; }
        public string Content15 { get; set; }
        public string Content16 { get; set; }
        public string Content17 { get; set; }
        public string Content18 { get; set; }
        public string Content19 { get; set; }
        public string Content20 { get; set; }
        public string Content21 { get; set; }
        public string Content22 { get; set; }
        public string Content23 { get; set; }
        public string Content24 { get; set; }
        public string Content25 { get; set; }
        public string Content26 { get; set; }
        public string Content27 { get; set; }
        public string Content28 { get; set; }
        public string Content29 { get; set; }
        public string Content30 { get; set; }
    }
}