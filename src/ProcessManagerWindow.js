const { app, BrowserWindow, shell, ipcMain, webContents } = require('electron');
const path = require('path');
const process = require('process');

const { onExtendedProcessMetrics } = require('electron-process-reporter');

class ProcessManagerWindow extends BrowserWindow {

  constructor(options) {
    const winOptions = Object.assign({
      width: 800,
      height: 300,
      useContentSize: true,
      webPreferences: {
        nodeIntegration: true,
        webviewTag: true,
      }
    }, options || {});

    super(winOptions);
    this.options = options;

    this.attachProcessReporter();

    const indexHtml = 'file://' + path.join(__dirname, '..', 'process-manager.html');
    this.loadURL(indexHtml);
  }

  showWhenReady() {
    this.once('ready-to-show', () => {
      this.show();
    });
  }

  sendStatsReport(reportData) {
    if (!this.webContents) return;
    this.webContents.send('process-manager:data', reportData);
  }

  openDevTools() {
    this.webContents.openDevTools();
  }

  attachProcessReporter() {
    this.subscription = onExtendedProcessMetrics(app)
      .subscribe(report => this.sendStatsReport(report))
    ipcMain.on('process-manager:kill-process', (e, pid) => {
      // ignore if not for us
      if (!this || this.isDestroyed()) return;
      if (e.sender !== this.webContents) return;

      this.emit('kill-process', pid);
    });
    ipcMain.on('process-manager:open-dev-tools', (e, webContentsId) => {
      // ignore if not for us
      if (!this || this.isDestroyed()) return;
      if (e.sender !== this.webContents) return;


      this.emit('open-dev-tools', webContentsId);

    });
    this.on('closed', () => {
      if (this.subscription) this.subscription.unsubscribe()
    });
  }
}

module.exports = ProcessManagerWindow;
