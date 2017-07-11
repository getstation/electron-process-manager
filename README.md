# Process Manager UI for Electron Apps

This package provides a process manager UI for Electron applications.

It opens a window displaying a table of every processes run by the Electron application with information (type, URL for `webContents`, memory..).

[![npm version](https://badge.fury.io/js/electron-process-manager.svg)](https://badge.fury.io/js/electron-process-manager)

![screenshot](https://github.com/getstation/electron-process-manager/raw/master/.github/screenshots/window.png)

:warning: For Electron >=1.7.1

It can be useful to debug performance of an app with several `webview`.

It's inspired from Chrome's task manager.

## Features

- [x] Memory reporting
- [x] Link memory data to web-contents (for electron >=1.7.1)
- [x] Kill a process from the UI

## Installation

```bash
$ npm install electron-process-manager
```

## Usage
```js
const { openProcessManager } = require('electron-process-manager');

openProcessManager();
```

## Future

- Be able to sort columns
- Add physical memory (noted as "Memory" in Chrome's task manager)
- Add CPU metrics (once [electron#9486](https://github.com/electron/electron/pull/9486)) is merged)
- Add networks metrics

Pull requests welcome :)

## License

MIT License
