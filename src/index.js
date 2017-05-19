var ProcessStatsReporter = require('./ProcessStatsReporter.js');
var ProcessManagerWindow = require('./ProcessManagerWindow.js');

exports.ProcessStatsReporter = ProcessStatsReporter;
exports.ProcessManagerWindow = ProcessManagerWindow;

exports.openProcessManager = function() {
  const window = new ProcessManagerWindow();
  window.showWhenReady();

}
