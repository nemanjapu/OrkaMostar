﻿using System.Collections.Generic;
using System.Web.Mvc;

namespace OrkaMostar.Helpers
{
    public class DropdownHelper
    {
        public static List<SelectListItem> GetPageTemplateList()
        {
            var listPageTemplate = new List<SelectListItem>
            {
                new SelectListItem{Text = "Blank Page", Value = "OnlyTextTemplate", Selected = true},
                new SelectListItem{Text = "Homepage", Value = "Homepage"},
                new SelectListItem{Text = "Contact", Value = "ContactTemplate"},
                new SelectListItem{Text = "Blog", Value = "BlogTemplate"}
            };

            return listPageTemplate;
        }
    }
}