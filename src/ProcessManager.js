const { EventEmitter } = require('events');
const process = require('process');

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
    this.window.on('closed', () => this.window = null)
    this.emit('open-window', this.window);

    return this.window;
  }

  killProcess(pid) {
    this.emit('will-kill-process', pid, this.window);
    process.kill(pid);
    this.emit('killed-process', pid, this.window);
  }

}

module.exports = ProcessManager;
