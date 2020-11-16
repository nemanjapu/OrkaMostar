using Microsoft.AspNet.Identity.EntityFramework;
using OrkaMostar.Core.Models;
using OrkaMostar.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace OrkaMostar.DAL
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        public DbSet<GlobalValues> GlobalValues { set; get; }
        public DbSet<Lead> Leads { set; get; }
        public DbSet<Menu> Menus { set; get; }
        public DbSet<WebsitePage> WebsitePages { set; get; }
    }
}