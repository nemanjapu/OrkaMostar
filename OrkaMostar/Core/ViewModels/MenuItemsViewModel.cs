using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OrkaMostar.Core.ViewModels
{
    public class MenuItemsViewModel
    {
        public int Id { get; set; }
        public int ParentId { get; set; }
        public bool OpenPageInNewTab { get; set; }
        public string MenuName { get; set; }
        public bool isHidden { get; set; }
        public string PageUrl { get; set; }
        public string PageExternalUrl { get; set; }

        public bool hasChildren { get; set; }
    }
}