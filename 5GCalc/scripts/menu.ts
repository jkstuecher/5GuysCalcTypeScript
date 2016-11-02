/// <reference path="typings/jquery/jquery.d.ts" />

declare var downloadedMenu: Menu;

interface IItem {
    Selected: boolean;
    ItemName: string;
    ServingSize: number;
    Calories: number;
    CaloriesFromFat: number;
    TotalFat: number;
    SaturatedFat: number;
    TransFat: number;
    Cholesterol: number;
    Sodium: number;
    Carbs: number;
    Fiber: number;
    Sugar: number;
    Protein: number;
    ServingSizeUnit: string;
    Section: string;
    ItemOrder: number;
    SectionOrder: number;
}

interface IMenu {
    Items: IItem[];
    Categories: string[];
    Total?: any;
    SelectedItems?: any;
}

class Menu implements IMenu {
    public Items: Item[];
    public Categories: string[];
    public Total?: any;
    public SelectedItems?: any;

}

class Item implements IItem {
    public Selected: boolean;
    public ItemName: string;
    public ServingSize: number;
    public Calories: number;
    public CaloriesFromFat: number;
    public TotalFat: number;
    public SaturatedFat: number;
    public TransFat: number;
    public Cholesterol: number;
    public Sodium: number;
    public Carbs: number;
    public Fiber: number;
    public Sugar: number;
    public Protein: number;
    public ServingSizeUnit: string;
    public Section: string;
    public ItemOrder: number;
    public SectionOrder: number;
}

function GetJSONInfo() {
    $.getJSON("../api/Menu/GetMenu", res => {
        Output(res);
    });
}

function Output(downloadedMenu: Menu) {
    downloadedMenu.Categories
    document.open(); //useful?
    downloadedMenu.Items.sort(function (a, b) {
        if (a.ItemOrder < b.ItemOrder) return -1;
        if (a.ItemOrder > b.ItemOrder) return 1;
        return 0;
    });

    document.write("<h1>here we go</h1>");
    document.write("<hr>");
    document.write("<h2>Categories</h2>");
    document.write("<ul>");
    for (let c of downloadedMenu.Categories) {
        document.write("<li>" + c + "</li>");
        var catItems = downloadedMenu.Items.filter(function (x) { return x.Section == c; });
        document.write("<ul>");
        for (let cI of catItems) {
            document.write("<li>" + cI.ItemName + "</li>");
        }
        document.write("</ul>");
    }
    document.write("</ul>");

    document.close(); //stopped the page from loading
}

GetJSONInfo();
