using System.Web;
using System.Web.Optimization;

namespace OrkaMostar
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            /*ADMIN BUNDLES*/

            bundles.Add(new ScriptBundle("~/bundles/AdminScripts").Include(
                       "~/Scripts/jquery-{version}.js",
                       "~/Scripts/jquery.validate*",
                       "~/Scripts/jquery.unobtrusive-ajax.js",
                       "~/Scripts/jquery-ui-1.12.1.js",
                       "~/Scripts/jquery.mjs.nestedSortable.js",
                       "~/Areas/Admin/Content/js/jquery.browser.mobile.js",
                       "~/Areas/Admin/Content/js/popper.min.js",
                       "~/Areas/Admin/Content/js/bootstrap.js",
                       "~/Areas/Admin/Content/js/bootstrap-datepicker.js",
                       "~/Areas/Admin/Content/js/common.js",
                       "~/Areas/Admin/Content/js/nanoscroller.js",
                       "~/Areas/Admin/Content/js/jquery.magnific-popup.js",
                       "~/Areas/Admin/Content/js/jquery.placeholder.js",
                       "~/Areas/Admin/Content/js/ios7-switch.js",
                       "~/Areas/Admin/Content/js/theme.js",
                       "~/Scripts/toastr.js",
                       "~/Areas/Admin/Content/js/custom.js",
                       "~/Areas/Admin/Content/js/theme.init.js"
                       ));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                       "~/Areas/Admin/Content/js/modernizr.js"
                       ));

            bundles.Add(new StyleBundle("~/Content/admin/FontAwesomeCss").Include(
                        "~/Areas/Admin/Content/css/all.min.css", new CssRewriteUrlTransform()
                        ));

            bundles.Add(new StyleBundle("~/Content/AdminCSS").Include(
                        "~/Areas/Admin/Content/css/bootstrap.css",
                        "~/Areas/Admin/Content/css/animate.css",
                        "~/Areas/Admin/Content/css/magnific-popup.css",
                        "~/Areas/Admin/Content/css/bootstrap-datepicker3.css",
                         "~/Content/toastr.css",
                        "~/Areas/Admin/Content/css/theme.css",
                        "~/Areas/Admin/Content/css/default.css",
                        "~/Areas/Admin/Content/css/custom.css"
                        ));
        }
    }
}
