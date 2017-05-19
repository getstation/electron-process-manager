var ProcessStatsReporter = require('./ProcessStatsReporter.js');
var ProcessManagerWindow = require('./ProcessManagerWindow.js');

exports.ProcessStatsReporter = ProcessStatsReporter;
exports.ProcessManagerWindow = ProcessManagerWindow;

exports.openProcessManager = function() {
  const reporter = new ProcessStatsReporter();

  const window = new ProcessManagerWindow({ reporter });
  window.showWhenReady();

}
