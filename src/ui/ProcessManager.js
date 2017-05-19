import React from 'react';
import { ipcRenderer } from 'electron';

import ProcessTable from './ProcessTable';

export default class ProcessManager extends React.Component {

  constructor() {
    super();
    this.state = { processData: null };
  }

  componentWillMount() {
    ipcRenderer.on('process-manager:data', (_, data) => {
      this.setState({ processData: data });
    })
  }

  render () {
    const { processData } = this.state;
    if (!processData) return (<span>No data</span>);

    return (
      <div className="window">
        <ProcessTable processData={processData} />
      </div>
    )
  }
}
