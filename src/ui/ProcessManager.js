import React from 'react';
import { ipcRenderer } from 'electron';

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

  canDebug() {
    if (!this.state.selectedPid) return false;
    const pids = this.state.processData.map(p => p.pid);

    // verify that select pid is in list of processes
    //return pids.indexOf(this.state.selectedPid) !== -1;

    return true;
  }

  handleKillProcess() {
    const pid = this.state.selectedPid;
    if (!pid) return;
    ipcRenderer.send('process-manager:kill-process', pid);
  }

  handleDebugProcess() {
    const pid = this.state.selectedPid;
    if (!pid) return;
    ipcRenderer.send('process-manager:debug-process', pid);
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
            disableDebug={!this.canDebug()}
            onDebugClick={this.handleDebugProcess.bind(this)}

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
