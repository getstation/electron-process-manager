const  { app, BrowserWindow, shell } = require('electron');
const path = require('path');

class ProcessManagerWindow extends BrowserWindow {

  constructor(options) {
    const winOptions = Object.assign({
      width: 400,
      height: 400,
      useContentSize: true
    }, options || {});

    super(winOptions);
    this.options = options;

    const indexHtml = 'file://' + path.join(__dirname, '..', 'process-manager.html');
    this.loadURL(indexHtml);
  }

  showWhenReady() {
    this.once('ready-to-show', () => {
      this.show();
      this.openDevTools()
    });
  }

  sendStatsReport(reportData) {
    if (!this.webContents) return;
    this.webContents.send('process-manager:data', reportData);
  }

  openDevTools() {
    this.webContents.openDevTools();
  }
}

module.exports = ProcessManagerWindow;
