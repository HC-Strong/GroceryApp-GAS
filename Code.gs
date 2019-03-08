//// GLOBAL VARIABLES
var ss = SpreadsheetApp.getActiveSpreadsheet();
var storeSheet = ss.getSheetByName("stores");
var itemSheet = ss.getSheetByName("items");
var statusSheet = ss.getSheetByName("statuses");



function onOpen() {  // Creates a menu option to open the sidebar
  SpreadsheetApp.getUi()
      .createMenu('Groceries!')
      .addItem('Open Grocery List', 'openGroceryList')
      .addToUi();
  
  openPanel();
}



function openGroceryList(){
  var title = 'Grocery' + ' List';
  
  var html = HtmlService.createTemplateFromFile('Index').evaluate()
      .setWidth(1080/2)
      .setHeight(1920/2);

  SpreadsheetApp.getUi()
      .showModalDialog(html, title);
}


function getDataFromSheet(sheetName, rangeRef) {
  var curSheet = ss.getSheetByName(sheetName);   /// This with having to get the sheet when I have those vars is annoying but I can't see a way around since the client doesn't have those vars
  
  var range = curSheet.getRange(rangeRef);
  var data = range.getValues();
  Logger.log("Returning " + data + " from spreadsheet");
  return data;
}