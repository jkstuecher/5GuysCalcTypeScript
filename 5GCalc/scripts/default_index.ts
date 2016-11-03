/// <reference path="typings/jquery/jquery.d.ts" />

function itemNameConverter(itemName: string) {
    let returnName: string;
    itemName = itemName.replace('cb_', ''); //replace cp_prefix
    itemName = itemName.replace(/\_/g, ' '); //replace underscore with space
    itemName = itemName.replace(/\-/g, '.'); //replace - with period
    return itemName;
}

function checkboxChecker(divToUpdate : string) {
    var sList = ""; //will hold list of checked item names
    var itemToAdd = ""; //will hold the individual item to add
    //for each checkbox on page
    $('input[type=checkbox]').each(function () {
        itemToAdd = (this.checked ? this.id + ";" : ""); //if checked, itemToAdd is item name, else empty string
        sList += itemNameConverter(itemToAdd)
    });
    GetSelectionTotals(sList, divToUpdate);
}

function hyperlinkSelector(itemName: string, divToUpdate: string) {

    var element = <HTMLInputElement>document.getElementById('cb_'+itemName);
    if (element.checked)
    { $('#cb_' + itemName).prop("checked", false); }
    else { $('#cb_' + itemName).prop("checked", true); }
    checkboxChecker(divToUpdate);
    console.log("fire!");
}

function GetSelectionTotals(selectedItems: string, divToUpdate: string) {

    var output = "<ul>";
    var itemSplit = selectedItems.split(';');
    itemSplit.forEach(function (element) {
        if (!!element) {
            output += ("<li>" + element + "</li>");
        }
    });
    output += "</ul>";
    $(divToUpdate).html(output);
    let selectedMenuItems: Menu;

    $.getJSON('../api/Menu/GetTotal', "selectionComplete=" + selectedItems, function (selectedMenuItem) {
        $('#Calories').html("Calories: " + selectedMenuItem.Calories);
        $('#Fat').html("Fat: " + selectedMenuItem.Fat + "g");
        $('#Sodium').html("Sodium: " + selectedMenuItem.Sodium + "g");
        $('#Carbs').html("Total Carbs: " + selectedMenuItem.TotalCarbs + "g");
        $('#Fiber').html("Fiber: " + selectedMenuItem.Fiber + "g");
        $('#Protein').html("Protein: " + selectedMenuItem.Protein + "g");
    });
}