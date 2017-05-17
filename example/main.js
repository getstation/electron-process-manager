var electron = require('electron');
var app = electron.app;
var webContents = electron.webContents;
var BrowserWindow = electron.BrowserWindow;
var join = require('path').join;
var { openProcessManager }  = require('electron-process-manager')

app.once('window-all-closed',function() { app.quit(); });

app.once('ready', function() {
    var w = new BrowserWindow();
    w.once('closed', function() { w = null; });
    w.loadURL('file://' + join(__dirname, 'index.html'));

    setTimeout(() => {
      openProcessManager()
    }, 1000)

});
