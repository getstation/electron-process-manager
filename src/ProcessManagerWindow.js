const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { onExtendedProcessMetrics } = require('@getstation/electron-process-reporter');

class ProcessManagerWindow extends BrowserWindow {

  constructor(options) {
    const winOptions = Object.assign({
      width: 800,
      height: 300,
      useContentSize: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      }
    }, options || {});

    super(winOptions);
    this.options = options;

    this.attachProcessReporter();

    const indexHtml = 'file://' + path.join(__dirname, '..', 'process-manager.html');
    this.loadURL(indexHtml);
  }

  showWhenReady = () => {
    this.once('ready-to-show', () => {
      this.show();
    });
  }

  sendStatsReport = (reportData) => {
    if (!this.webContents) return;
    this.webContents.send('process-manager:data', reportData);
  }

  openDevTools = () => {
    this.webContents.openDevTools();
  }

  onOpenDevTools = (e, webContentsId) => {
    // ignore if not for us
    if (!this || this.isDestroyed()) return;
    if (e.sender !== this.webContents) return;

    this.emit('open-dev-tools', webContentsId);
  }

  onKillProcess = (e, pid) => {
    // ignore if not for us
    if (!this || this.isDestroyed()) return;
    if (e.sender !== this.webContents) return;

    this.emit('kill-process', pid);
  }

  attachProcessReporter = () => {
    this.subscription = onExtendedProcessMetrics(app)
      .subscribe(report => this.sendStatsReport(report))
    ipcMain.on('process-manager:kill-process', this.onKillProcess);
    ipcMain.on('process-manager:open-dev-tools', this.onOpenDevTools);
    ipcMain.handle('process-manager:defaultSorting', () => {
      return this.options.defaultSorting;
    });

    this.on('closed', () => {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      ipcMain.removeHandler('process-manager:defaultSorting');
      ipcMain.off('process-manager:kill-process', this.onKillProcess);
      ipcMain.off('process-manager:open-dev-tools', this.onOpenDevTools);
    });
  }
}

module.exports = ProcessManagerWindow;
