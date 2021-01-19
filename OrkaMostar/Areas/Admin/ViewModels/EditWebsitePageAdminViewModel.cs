using OrkaMostar.Core.Models;
using OrkaMostar.Helpers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OrkaMostar.Areas.Admin.ViewModels
{
    public class EditWebsitePageAdminViewModel
    {
        public int Id { get; set; }
        [Required]
        public string MenuName { get; set; }
        [Required]
        public string PageTitle { get; set; }
        [Required]
        public string PageUrl { get; set; }
        public string PageExternalUrl { get; set; }
        public bool OpenPageInNewTab { get; set; }
        public int SortOrder { get; set; }
        [Required]
        public string Template { get; set; }
        public int ParentId { get; set; }
        public IEnumerable<WebsitePage> Pages { get; set; }
        public string MetaDescription { get; set; }
        public string MetaKeywords { get; set; }
        public bool isHidden { get; set; }
        public HttpPostedFileBase File { get; set; }
        public string ImageToShow { get; set; }
        public List<SelectListItem> PageTemplateDropdown { get; set; }
        public DateTime DateAdded { get; set; }
        public bool isBlogPost { get; set; }
        [AllowHtml]
        public string Content1 { get; set; }

        public EditWebsitePageAdminViewModel()
        {
            PageTemplateDropdown = DropdownHelper.GetPageTemplateList();
            ImageToShow = "Areas/Admin/Content/images/upload-icon.png";
        }
    }
}