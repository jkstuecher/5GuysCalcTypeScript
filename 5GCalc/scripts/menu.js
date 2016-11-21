/// <reference path="typings/jquery/jquery.d.ts" />
var Menu = (function () {
    function Menu() {
    }
    return Menu;
}());
var Item = (function () {
    function Item() {
    }
    return Item;
}());
function GetJSONInfo() {
    $.getJSON("../api/Menu/GetMenu", function (res) {
        Output(res);
    });
}
function Output(downloadedMenu) {
    downloadedMenu.Categories;
    document.open(); //useful?
    downloadedMenu.Items.sort(function (a, b) {
        if (a.ItemOrder < b.ItemOrder)
            return -1;
        if (a.ItemOrder > b.ItemOrder)
            return 1;
        return 0;
    });
    document.write("<h1>here we go</h1>");
    document.write("<hr>");
    document.write("<h2>Categories</h2>");
    document.write("<ul>");
    var _loop_1 = function(c) {
        document.write("<li>" + c + "</li>");
        catItems = downloadedMenu.Items.filter(function (x) { return x.Section == c; });
        document.write("<ul>");
        for (var _i = 0, catItems_1 = catItems; _i < catItems_1.length; _i++) {
            var cI = catItems_1[_i];
            document.write("<li>" + cI.ItemName + "</li>");
        }
        document.write("</ul>");
    };
    var catItems;
    for (var _a = 0, _b = downloadedMenu.Categories; _a < _b.length; _a++) {
        var c = _b[_a];
        _loop_1(c);
    }
    document.write("</ul>");
    document.close(); //stopped the page from loading
}
GetJSONInfo();
//# sourceMappingURL=menu.js.map