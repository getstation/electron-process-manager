# Process Manager UI for Electron Apps

This package provides a process manager UI for Electron applications.

It opens a window displaying a table of every processes run by the Electron application with information (type, URL for `webContents`, memory..).

[![npm version](https://badge.fury.io/js/electron-process-manager.svg)](https://badge.fury.io/js/electron-process-manager)

![screenshot](https://github.com/getstation/electron-process-manager/raw/master/.github/screenshots/window.png)

:warning: For `@electron>=1.7.1` and `@electron<3.0.0`

It can be useful to debug performance of an app with several `webview`.

It's inspired from Chrome's task manager.

## Features

- [x] Memory reporting
- [x] Link memory data to web-contents (for electron >=1.7.1)
- [x] Kill a process from the UI
- [x] Open developer tools for a given process
- [x] CPU metrics
- [x] Sort by columns

## Installation

```bash
$ npm install electron-process-manager
```

## Usage
```js
const { openProcessManager } = require('electron-process-manager');

openProcessManager();
```

## Options
`openProcessManager` function can take options in paramters

#### options.defaultSorting
**defaultSorting.how**: `'ascending' | 'descending'`

**defaultSorting.path**:

| Field name         | path                       |
|--------------------|----------------------------|
| Pid                | 'pid'                      |
| WebContents Domain | 'webContents.0.URLDomain'  |
| Process Type       | 'webContents.0.type'       |
| Private Memory     | 'memory.privateBytes'      |
| Shared Memory      | 'memory.sharedBytes'       |
| Working Set Size   | 'memory.workingSetSize'    |
| % CPU              | 'cpu.percentCPUUSage'      |
| Idle Wake Ups /s   | 'cpu.idleWakeupsPerSecond' |
| WebContents Id     | 'webContents.0.id'         |
| WebContents Type   | 'webContents.0.type'       |
| WebContents URL    | 'webContents.0.URL'        |

example:
```js
const { openProcessManager } = require('electron-process-manager');

openProcessManager({ how: 'descending', path: 'cpu.percentCPUUsage' });
```

## Future

- Add physical memory (noted as "Memory" in Chrome's task manager)
- Add networks metrics

Pull requests welcome :)

## License

MIT License
