var ProcessStatsReporter = require('./ProcessStatsReporter.js');
var ProcessManagerWindow = require('./ProcessManagerWindow.js');

exports.ProcessStatsReporter = ProcessStatsReporter;
exports.ProcessManagerWindow = ProcessManagerWindow;

let processManagerWindow = null;
exports.openProcessManager = function() {
  if (processManagerWindow) {
    processManagerWindow.focus();
    return processManagerWindow;
  }

  processManagerWindow = new ProcessManagerWindow();
  processManagerWindow.showWhenReady();
  processManagerWindow.on('closed', () => processManagerWindow = null)

  return processManagerWindow;
}
