using OrkaMostar.DAL;
using System.Linq;
using System.Web;
using System.Web.Routing;

namespace OrkaMostar.Helpers
{
    public class CmsUrlConstraint : IRouteConstraint
    {
        public bool Match(HttpContextBase httpContext, Route route, string parameterName, RouteValueDictionary values, RouteDirection routeDirection)
        {
            using (ApplicationDbContext _ctx = new ApplicationDbContext())
            {
                var url = "";
                if (!string.IsNullOrEmpty(values[parameterName].ToString()))
                {
                    url = values[parameterName].ToString();
                }
                if (!url.EndsWith("/") && !string.IsNullOrEmpty(url))
                {
                    url = url + "/";
                }
                var page = _ctx.WebsitePages.Where(p => p.PageUrl.Equals("/" + url)).FirstOrDefault();
                if (page != null)
                {
                    HttpContext.Current.Items["cmspage"] = page;
                    return true;
                }
                return false;
            }
        }
    }
}