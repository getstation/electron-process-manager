var { app, shell, BrowserWindow, Menu, ipcMain } = require('electron');
var join = require('path').join;

var processManager  = require('..');
const defaultMenu = require('electron-default-menu');

processManager.on('killed-process', pid => console.log('Killed process', pid));

app.once('window-all-closed',function() { app.quit(); });

app.once('ready', function() {
    var w = new BrowserWindow();
    w.once('closed', function() { w = null; });
    w.loadURL('file://' + join(__dirname, 'index.html'));

    const menu =
      defaultMenu(app, shell)
      .map(menu => {
        if(menu.label === 'Window') {
          menu.submenu.push({
            label: 'Open Process Manager',
            click: () => processManager.open()
          })
        }
        return menu;
      });

   Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
});

if (process.env.TEST_PROCESS_MANAGER) {
  // emulate click on menu item
  ipcMain.on('open-process-manager', () => processManager.open());

  process.on('uncaughtException', function (error) {
    console.error(error, error.stack);
    process.exit(1);
  });

}
