import React from 'react';
import { ipcRenderer } from 'electron';
import { webContents } from 'electron';

import ProcessTable from './ProcessTable';
import ToolBar from './ToolBar';

export default class ProcessManager extends React.Component {

  constructor() {
    super();
    this.state = { processData: null, selectedPid: null };
  }

  componentWillMount() {
    ipcRenderer.on('process-manager:data', (_, data) => {
      this.setState({ processData: data });
    })
  }

  canKill() {
    if (!this.state.selectedPid) return false;
    const pids = this.state.processData.map(p => p.pid);

    // verify that select pid is in list of processes
    return pids.indexOf(this.state.selectedPid) !== -1;
  }

  canOpenDevTool() {
    return this.canKill() && this.getWebContentsIdForSelectedProcess() !== null;
  }

  getWebContentsIdForSelectedProcess() {
    const { processData, selectedPid } = this.state;
    if (!selectedPid) return null;

    const process = processData.find(p => p.pid === selectedPid);
    if (!process || !process.webContents || process.webContents.length === 0) return null;

    return process.webContents[0].id;
  }

  handleKillProcess() {
    const pid = this.state.selectedPid;
    if (!pid) return;
    ipcRenderer.send('process-manager:kill-process', pid);
  }

  handleOpenDevTool() {
    const webContentsId = this.getWebContentsIdForSelectedProcess();
    ipcRenderer.send('process-manager:open-dev-tools', webContentsId);
  }

  render () {
    const { processData } = this.state;
    if (!processData) return (<span>No data</span>);

    return (
      <div className="window">
        <header className="toolbar toolbar-header">
          <ToolBar
            disableKill={!this.canKill()}
            onKillClick={this.handleKillProcess.bind(this)}
            disabelOpenDevTool={!this.canOpenDevTool()}
            onOpenDevToolClick={this.handleOpenDevTool.bind(this)}

          />
        </header>
        <div className="process-table-container">
          <ProcessTable
            processData={processData}
            selectedPid={this.state.selectedPid}
            onSelectedPidChange={pid => this.setState({ selectedPid: pid })}
            />
        </div>
      </div>
    )
  }
}
