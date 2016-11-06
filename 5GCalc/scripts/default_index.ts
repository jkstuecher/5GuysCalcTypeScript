/// <reference path="typings/jquery/jquery.d.ts" />

//takes html item name, and turns it into an item name ex: cb_A-1-_Steak_Sauce -> A.1. Steak Sauce
function itemNameConverter(itemName: string) {
    let returnName: string;
    itemName = itemName.replace('cb_', ''); //replace cp_prefix
    itemName = itemName.replace(/\_/g, ' '); //replace underscore with space
    itemName = itemName.replace(/\-/g, '.'); //replace - with period
    return itemName;
}

//checks every checkbox, and if checked, updates selection
function checkboxChecker(divToUpdate : string, basePath : string) {
    var sList = ""; //will hold list of checked item names
    var itemToAdd = ""; //will hold the individual item to add
    //for each checkbox on page
    $('input[type=checkbox]').each(function () {
        itemToAdd = (this.checked ? this.id + ";" : ""); //if checked, itemToAdd is item name, else empty string
        sList += itemNameConverter(itemToAdd)
    });
    GetSelectionTotals(sList, divToUpdate, basePath);
}

//if hyperlink is clicked, corresponding checkbox is checked
function hyperlinkSelector(itemName: string, divToUpdate: string, basePath : string) {
    var element = <HTMLInputElement>document.getElementById('cb_'+itemName);
    if (element.checked) //toggle the checkbox
    { $('#cb_' + itemName).prop("checked", false); }
    else { $('#cb_' + itemName).prop("checked", true); }
    checkboxChecker(divToUpdate, basePath);
}


function GetSelectionTotals(selectedItems: string, divToUpdate: string, basePath : string) {

    var output = "<ul>";
    var itemSplit = selectedItems.split(';');
    itemSplit.forEach(function (element) {
        if (!!element) {
            output += ("<li>" + element + "</li>");
        }
    });
    output += "</ul>";
    if (itemSplit.length > 1) {
        console.log(itemSplit.length);
        output += (`<a href="javascript:ResetSelection('${divToUpdate}','${basePath}')">Reset Your Selection</a>`);
    } else {
        output = "Your Selection";
    }
    $(divToUpdate).html(output);
    let selectedMenuItems: Menu;

    $.getJSON(basePath+'/api/Menu/GetTotal', "selectionComplete=" + selectedItems, function (selectedMenuItem) {
        $('#Calories').html("Calories: " + selectedMenuItem.Calories);
        $('#Fat').html("Fat: " + selectedMenuItem.Fat + "g");
        $('#Sodium').html("Sodium: " + selectedMenuItem.Sodium + "g");
        $('#Carbs').html("Total Carbs: " + selectedMenuItem.TotalCarbs + "g");
        $('#Fiber').html("Fiber: " + selectedMenuItem.Fiber + "g");
        $('#Protein').html("Protein: " + selectedMenuItem.Protein + "g");
    });
}

function ResetSelection(divToUpdate: string, basePath: string) {
    $('input[type=checkbox]').each(function () {
        this.checked = false;
    });
    checkboxChecker(divToUpdate, basePath);
}