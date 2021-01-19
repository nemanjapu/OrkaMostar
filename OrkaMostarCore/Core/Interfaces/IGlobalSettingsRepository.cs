using OrkaMostar.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrkaMostar.Core.Interfaces
{
    public interface IGlobalSettingsRepository
    {
        GlobalValues GetGlobalValues();
    }
}
