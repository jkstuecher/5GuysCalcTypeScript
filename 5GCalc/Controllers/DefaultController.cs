using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace _5GCalc.Controllers
{
    public class DefaultController : Controller
    {
        // GET: Default
        public ActionResult Index()
        {
          return View(Services.MenuService.GetMenu());
        }

        public ActionResult NutritionInfo()
        {
            return View();
        }

        public ActionResult Cleandex()
        {
            return View();
        }
    }
}