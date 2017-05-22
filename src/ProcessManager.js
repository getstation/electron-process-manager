const { EventEmitter } = require('events');
const { app, webContents } = require('electron');

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
    this.window.on('closed', () => this.window = null)
    this.emit('open-window', this.window);

    return this.window;
  }

}

module.exports = ProcessManager;
