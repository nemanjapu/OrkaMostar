using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(OrkaMostar.Startup))]
namespace OrkaMostar
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
