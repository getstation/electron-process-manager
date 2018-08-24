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
    this.window.on('open-dev-tools', webContentsId => this.openDevTools(webContentsId))
    this.window.on('closed', () => this.window = null)
    this.emit('open-window', this.window);

    return this.window;
  }

  killProcess(pid) {
    this.emit('will-kill-process', pid, this.window);
    process.kill(pid);
    this.emit('killed-process', pid, this.window);
  }

  openDevTools(webContentsId) {
    this.emit('will-open-dev-tools', webContentsId, this.window);

    const wc = webContents.fromId(webContentsId);
    wc.openDevTools({mode: 'detach'});

    this.emit('did-open-dev-tools', webContentsId, this.window);
  }

}

module.exports = ProcessManager;
