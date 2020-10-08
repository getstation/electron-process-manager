const Application = require('spectron').Application;
const { join } = require('path');
const assert = require('assert');

const app = new Application({
  env: { TEST_PROCESS_MANAGER: 1 },
  path: require(join(__dirname, '../node_modules/electron')),
  args: [join(__dirname, '../example/main.js')]
});

app.start()
  .then(() => app.client.waitUntilWindowLoaded())
  .then(() => app.electron.ipcRenderer.send('open-process-manager'))
  .then(() => app.client.waitUntilWindowLoaded())
  .then(() => assert(app.client.getWindowCount(), 2))
  .then(() => app.client.switchWindow(/process-manager\.html/))
  .then(() => app.client.waitForVisible('#app .process-table'))
  .then(() => new Promise(res => setTimeout(res, 5000)))
  .then(() => app.stop())
  .catch(function (error) {
    console.error('Test failed', error);
    if (app && app.isRunning()) {
      app.stop().then(() => process.exit(1))
    } else process.exit(1);
  });
