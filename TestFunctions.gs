function testFunctionWarning() {
  Logger.log("Warning! You've used a test function. This is fine if you're just testing stuff, but you're gonna delete all of the functions at some point.");
}


function getDataTest(cellRef) {
  
  testFunctionWarning();
  
  // This is a testing function, when I recreate this sort of thing I want data about the spreadsheet stored in it's own global template/class so I have it when I need it from anywhere serverside
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var storeSheet = ss.getSheetByName("items");
  var range = storeSheet.getRange(cellRef);
  var data = range.getValues();
  Logger.log(data);
  return data;
}

function test() {
  getDataTest('A1:B4'); 
}