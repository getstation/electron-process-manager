const { EventEmitter } = require('events');
const { app, webContents } = require('electron');

class ProcessStatsReporter extends EventEmitter {
  start() {
    this._intervalId = setInterval(() => {
      this.emit('data', this.getReportData());
    }, 1000)
  }

  getReportData() {
    const memoryInfo = app.getAppMemoryInfo();

    const webContentsInfo =  webContents.getAllWebContents().map(wc => ({
      type: wc.getType(),
      id: wc.id,
      pid: wc.getOSProcessId(),
      URL: wc.getURL()
    }));


    const thisProcessPid = process.pid;
    const thisProcessType = process.type;

    return memoryInfo.map(proc => {
      if (proc.pid === thisProcessPid) {
        proc.type = thisProcessType;
      } else {
        proc.type = 'renderer';
      }

      const wc = webContentsInfo.find(wc => wc.pid === proc.pid);
      if (!wc) return proc;

      proc.webContents = proc.webContents || [];
      proc.webContents.push(wc);

      return proc
    });
  }

}

module.exports = ProcessStatsReporter;
