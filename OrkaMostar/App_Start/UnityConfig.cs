using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using OrkaMostar.Controllers;
using OrkaMostar.Core;
using OrkaMostar.Core.Interfaces;
using OrkaMostar.Core.Repositories;
using OrkaMostar.DAL;
using OrkaMostar.Models;
using System.Data.Entity;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Unity;
using Unity.Injection;
using Unity.Lifetime;
using Unity.WebApi;

namespace OrkaMostar
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();

            container.RegisterType<AccountController>(new InjectionConstructor());
            container.RegisterType<DbContext, ApplicationDbContext>(new HierarchicalLifetimeManager());
            container.RegisterType<UserManager<ApplicationUser>>(new HierarchicalLifetimeManager());
            container.RegisterType<IUserStore<ApplicationUser>, UserStore<ApplicationUser>>(new HierarchicalLifetimeManager());
            container.RegisterType<IAuthenticationManager>(new InjectionFactory(o => System.Web.HttpContext.Current.GetOwinContext().Authentication));

            container.RegisterType<IUnitOfWork, UnitOfWork>();
            container.RegisterType<IGlobalSettingsRepository, GlobalValuesRepository>();
            container.RegisterType<ILeadsRepository, LeadsRepository>();
            container.RegisterType<IMenusRepository, MenusRepository>();
            container.RegisterType<IWebsitePagesRepository, WebsitePagesRepository>();

            DependencyResolver.SetResolver(new Unity.Mvc5.UnityDependencyResolver(container));
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}