var { app, shell, webContents, BrowserWindow, Menu} = require('electron');
var join = require('path').join;

var { openProcessManager }  = require('electron-process-manager');
const defaultMenu = require('electron-default-menu');

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
            click: () => openProcessManager()
          })
        }
        return menu;
      });

   Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
});
