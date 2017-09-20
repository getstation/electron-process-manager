const { EventEmitter } = require('events');
const process = require('process');
const  { webContents } = require('electron');

var ProcessManagerWindow = require('./ProcessManagerWindow.js');


class ProcessManager extends EventEmitter {

  constructor() {
    super();

    // legacy
    this.openProcessManager = this.open.bind(this);
  }

  open () {
    if (this.window) {
      this.window.focus();
    }

    this.window = new ProcessManagerWindow();
    this.window.showWhenReady();
    this.window.on('kill-process', pid => this.killProcess(pid))
    this.window.on('debug-process', webContentsId => this.debugProcess(webContentsId))
    this.window.on('closed', () => this.window = null)
    this.emit('open-window', this.window);

    return this.window;
  }

  killProcess(pid) {
    this.emit('will-kill-process', pid, this.window);
    process.kill(pid);
    this.emit('killed-process', pid, this.window);
  }

  debugProcess(webContentsId) {
    this.emit('will-debug-process', webContentsId, this.window);
    const webContentsInfo =  webContents.getAllWebContents();
    const wc = webContentsInfo.find(wc => wc.id === webContentsId);
    wc.openDevTools({detached: true});
    this.emit('debugged-process', webContentsId, this.window);
  }

}

module.exports = ProcessManager;
