const  { app, BrowserWindow, shell } = require('electron');
const path = require('path');

class ProcessManagerWindow extends BrowserWindow {

  constructor(options) {
    const winOptions = Object.assign({
      width: 800,
      height: 300,
      useContentSize: true
    }, options || {});

    super(winOptions);
    this.options = options;

    this._reporterDataEventCallback = this._reporterDataEventCallback.bind(this);

    if (this.options.reporter) this.attachProcessReporter(this.options.reporter);

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

  _reporterDataEventCallback(reportData) {
    if(!this) return
    this.sendStatsReport(reportData);
  }

  attachProcessReporter(reporter) {
    reporter.on('data', this._reporterDataEventCallback);
    this.on('closed', () => reporter.removeListener('data', this._reporterDataEventCallback))
    reporter.start();
  }
}

module.exports = ProcessManagerWindow;
