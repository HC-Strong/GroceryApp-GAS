//// GLOBAL VARIABLES
//Nothing here yet




function onOpen() {  // Creates a menu option to open the sidebar
  SpreadsheetApp.getUi()
      .createMenu('Groceries!')
      .addItem('Open Panel', 'openPanel')
      .addToUi();
  
  openPanel();
}



function openPanel(){
  var title = 'Grocery' + ' List!';
  
  var html = HtmlService.createTemplateFromFile('Index').evaluate()
      .setWidth(1920)
      .setHeight(1080);

  SpreadsheetApp.getUi()
      .showModalDialog(html, title);
}