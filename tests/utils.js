const Promise = require('bluebird');
require('bluebird-extra').usePromise(Promise);

const setUpApp = function(app) {
  app.client.addCommand('changeFocusToMatchingURL', URLRegexp => {
    return app.client.windowHandles()
      .then(handles => Promise.eachAny(handles.value, handle => {
        return app.client.window(handle)
          .then(() => app.client.getUrl())
          .then(url => !!url.match(URLRegexp) || undefined)
      }))
  })
}

module.exports.setUpApp = setUpApp;
