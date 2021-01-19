using OrkaMostar.Core.Interfaces;
using OrkaMostar.Core.Repositories;
using OrkaMostar.DAL;

namespace OrkaMostar.Core
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _ctx;
        
        public ILeadsRepository Leads { get; private set; }
        public IMenusRepository Menus { get; private set; }
        public IWebsitePagesRepository WebsitePages { get; private set; }
        public IGlobalSettingsRepository GlobalSettings { get; private set; }

        public UnitOfWork(ApplicationDbContext ctx)
        {
            _ctx = ctx;
            Leads = new LeadsRepository(_ctx);
            Menus = new MenusRepository(_ctx);
            WebsitePages = new WebsitePagesRepository(_ctx);
            GlobalSettings = new GlobalValuesRepository(_ctx);
        }

        public void Complete()
        {
            _ctx.SaveChanges();
        }
    }
}