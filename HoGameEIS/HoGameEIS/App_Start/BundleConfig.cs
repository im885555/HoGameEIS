using System;
using System.Web.Optimization;
using System.Web.Optimization.React;


namespace HoGameEIS.App_Start
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/react").Include(
                        "~/Scripts/react/react-{version}.js"));
            //Url.Content("~/Scripts/react/react-0.13.1.js")

            bundles.Add(new JsxBundle("~/bundles/main").Include(
                "~/Scripts/jquery-{version}.js",
                "~/Scripts/react/react-0.13.1.js",
                "~/Scripts/moment.js",
                "~/Scripts/bootstrap.js",
                "~/Scripts/bootstrap-datetimepicker.js",
                "~/Scripts/bootstrap-table.js"));

            bundles.Add(new JsxBundle("~/bundles/app")
                .IncludeDirectory("~/Scripts/app", "*.jsx", true));

            //// Use the development version of Modernizr to develop with and learn from. Then, when you're
            //// ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            //bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
            //            "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/bootstrap-datetimepicker.css",
                      "~/Content/bootstrap-table.css",
                      "~/Content/site.css"));
        }
    }
}