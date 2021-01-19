using OrkaMostar.Core.Interfaces;
using OrkaMostar.Core.Models;
using OrkaMostar.DAL;
using System.Collections.Generic;
using System.Linq;

namespace OrkaMostar.Core.Repositories
{
    public class MenusRepository : IMenusRepository
    {
        private readonly ApplicationDbContext _ctx;

        public MenusRepository(ApplicationDbContext ctx)
        {
            _ctx = ctx;
        }

        public IEnumerable<Menu> GetAllMenus()
        {
            return _ctx.Menus.AsEnumerable();
        }

        public Menu GetMenuById(int id)
        {
            return _ctx.Menus.Find(id);
        }
    }
}