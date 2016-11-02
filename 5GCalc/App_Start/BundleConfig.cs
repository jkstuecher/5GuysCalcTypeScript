using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace _5GCalc.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content/styles")
                .IncludeDirectory("~/Content/", "*.css"));

            bundles.Add(new ScriptBundle("~/scripts/shared")
                   .IncludeDirectory("~/scripts/", "*.js"));
        }
    }
}