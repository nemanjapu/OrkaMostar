using OrkaMostar.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrkaMostar.Core
{
    public interface IUnitOfWork
    {
        ILeadsRepository Leads { get; }
        IMenusRepository Menus { get; }
        IWebsitePagesRepository WebsitePages { get; }
        IGlobalSettingsRepository GlobalSettings { get; }

        void Complete();
    }
}
