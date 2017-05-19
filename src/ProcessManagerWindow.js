const  { app, BrowserWindow, shell } = require('electron');
const path = require('path');

const ProcessStatsReporter = require('./ProcessStatsReporter.js');

class ProcessManagerWindow extends BrowserWindow {

  constructor(options) {
    const winOptions = Object.assign({
      width: 800,
      height: 300,
      useContentSize: true
    }, options || {});

    super(winOptions);
    this.options = options;

    this.reporter = new ProcessStatsReporter();
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
    const reporter = this.reporter;
    reporter.on('data', data => this.sendStatsReport(data))
    this.on('closed', () => reporter.stop());
    reporter.start();
  }
}

module.exports = ProcessManagerWindow;
