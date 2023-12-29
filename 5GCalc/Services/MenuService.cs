 using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Web.Mvc;

namespace _5GCalc.Services
{
    public static class MenuService
    {
        public static Models.Menu GetMenu()
        {

            Models.Menu returnMenu = new Models.Menu();

            List<Models.MenuItem> menuList = new List<Models.MenuItem>();

            List<string> menuSections = new List<string>();

            DataSet itemsSet = new DataSet(); //will hold data about all the items
            itemsSet.ReadXmlSchema(HttpContext.Current.Server.MapPath("~/data/Items.xsd")); //get the schema
            itemsSet.ReadXml(HttpContext.Current.Server.MapPath("~/data/ItemsReOrder.xml")); //get the data
            DataTable itemsTable = itemsSet.Tables[1]; //load data into table

            DataView viewSections = new DataView(itemsTable); //will store info about the sections
            viewSections.Sort = "SectionOrder"; //sort by section sort order
            DataTable distinctSections = viewSections.ToTable(true, "Section"); //build table based on section

            foreach (DataRow dr in distinctSections.Rows) //for each section
            {
                menuSections.Add(dr["Section"].ToString());
                string sectionName = dr["Section"].ToString(); //get section name
                DataView viewMenuItems = new DataView(itemsTable); //will hold menu items under this section
                viewMenuItems.Sort = "ItemOrder"; //sort by Item Order field
                DataTable menuItems = viewMenuItems.ToTable(); //turn view into a table to manipulate
                DataRow[] theseItems = menuItems.Select("Section = '" + sectionName + "'");
                foreach (DataRow midr in theseItems)
                {
                    Models.MenuItem m = new Models.MenuItem(midr);
                    menuList.Add(m);
                }
            }

            returnMenu.Items = menuList;
            returnMenu.Sections = menuSections;

            return returnMenu;
        }
    }
}