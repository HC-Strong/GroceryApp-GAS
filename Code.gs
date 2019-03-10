//// GLOBAL VARIABLES
var ss = SpreadsheetApp.getActiveSpreadsheet();
var storeSheet = ss.getSheetByName("stores");
var itemSheet = ss.getSheetByName("items");
var statusSheet = ss.getSheetByName("statuses");
var defaultStatus = statusSheet.getRange(3,1).getValue();
var itemCols = {name: 1, status: 3, statusNum: 2};    /// Update/add column numbers for item attributes (from SS) here



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

function checkoutToSheet(rows) {         // can probably make this a more general function for editing also (maybe even adding and/or deleting)
  var range = itemSheet.getRange(rows[0].rowNum, itemCols.status, rows[rows.length-1].rowNum + 1 - rows[0].rowNum, 1);
  
  iterateRowEdits(range, rows, statusUpdate);
  Logger.log("Done checking out");
}

function checkoutTest() {
  var rowList = [2, 4];
 checkoutToSheet(rowList); 
}

function statusUpdate(input){
   return [defaultStatus];
}
                  
function iterateRowEdits(range, rows, edits){ //edits is function. So either changing status or removing data or whatever
  var sheetData = range.getValues();

 Logger.log(sheetData);
  
  var firstRowToEdit = rows[0].rowNum;
  
  for (row in rows) {  // for each row in the list of rows to edit
    var oldListPosition = +rows[row].rowNum - +firstRowToEdit + 1 - 1; //Plus 1 to make correct subtraction difference, minus 1 because indexes start at zero while row numbs start at 1
    Logger.log(sheetData[oldListPosition]);
    sheetData[oldListPosition] = edits(sheetData[oldListPosition]);
  }
  Logger.log(sheetData);
  
  range.setValues(sheetData);
}






/////// below this is item removal code I started on but then realized I don't need that for checkout... ooops, try to integrate this with the checkout code so the looping isn't duplicated

function removeItems(rows){
  var colCount = 3;     ///This is hardcoded for number of item columns, will fix this later (can't use .length on an object which is how the Global var col#s are stored)
  
//  var a = rows[0]+1;
//  var b = 1;
//  var c = rows[rows.length-1] + 1 - rows[0];
//  var d = colCount;
//  Logger.log("Length is: " + rows.length);
//  Logger.log("Range data: " + a + " \\\ " + b + " \\\ " + c + " \\\ " + d);
  
  
  var fullRange = itemSheet.getRange(rows[0], 1, rows[rows.length-1] + 1 - rows[0], colCount);
  removeEntries(fullRange, rows);
}

function removeEntries(range, rows){
  var oldList = range.getValues();
  
  Logger.log(oldList);
  
  var firstToRemove = rows[0];
  
  for (row in rows) {  // for each row in the list of rows to remove
    var oldListPosition = +rows[row] - +firstToRemove + 1 - 1; //Plus 1 to make correct subtraction difference, minus 1 because indexes start at zero while row numbs start at 1
    Logger.log(oldList[oldListPosition]);
    //oldList[oldListPosition] = 
  }
  
  Logger.log(oldList);
}


function tempTest(){
  var rows = [2, 4];
  Logger.log(rows);
  removeItems(rows); 
}