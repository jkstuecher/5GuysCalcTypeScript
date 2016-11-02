using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace _5GCalc.API
{
    public class MenuController : ApiController
    {
        public Models.Menu GetMenu()
        {
            return Services.MenuService.GetMenu();
        }

        [HttpGet]
        public int DoubleThis(int x)
        {
            return x * 2;
        }

        public Models.SelectionTotals GetTotal(string selectionComplete)
        {
            selectionComplete = selectionComplete ?? "";
            var menu = Services.MenuService.GetMenu();
            var total = new Models.SelectionTotals();

            string[] selection = selectionComplete.Split(';');

            if (selection != null)
            {
                foreach (string s in selection)
                {
                    var item = menu.Items.FirstOrDefault(x => x.ItemName == s);
                    if (item != null)
                    {
                        total.Calories += Convert.ToDecimal(item.Calories);
                        total.Fat += Convert.ToDecimal(item.TotalFat);
                        total.Protein += Convert.ToDecimal(item.Protein);
                        total.Sodium += Convert.ToDecimal(item.Sodium);
                        total.TotalCarbs += Convert.ToDecimal(item.Carbs);
                        total.Fiber += Convert.ToDecimal(item.Fiber);
                    }
                }
                return total;
            }
            return new Models.SelectionTotals();
        }
    }
}