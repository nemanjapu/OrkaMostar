using System.Web;
using System.Web.Mvc;

namespace OrkaMostar.Helpers
{
    public class HTMLHelpers
    {
        public static IHtmlString GetBaseUrl()
        {
            var request = HttpContext.Current.Request;
            //var appUrl = HttpRuntime.AppDomainAppVirtualPath;

            var baseUrl = string.Format("{0}://{1}", "https", request.Url.Authority);

            return MvcHtmlString.Create(baseUrl);
        }
    }
}