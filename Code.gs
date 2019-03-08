//// GLOBAL VARIABLES
var ss = SpreadsheetApp.getActiveSpreadsheet();
var storeSheet = ss.getSheetByName("stores");
var itemSheet = ss.getSheetByName("items");



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