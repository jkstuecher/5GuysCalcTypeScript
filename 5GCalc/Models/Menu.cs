﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _5GCalc.Models
{
    public class Menu
    {
        public List<MenuItem> Items { get; set; }

        public List<string> Categories { get; set; }

        public MenuItem Total { get; set; }

        public List<string> SelectedItems { get; set; }

    }
}