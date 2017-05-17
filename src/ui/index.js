import React from 'react';
import { render } from 'react-dom';
import { ipcRenderer } from 'electron';

import ProcessTable from './ProcessTable';

class App extends React.Component {

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

    return <ProcessTable processData={processData} />
  }
}

render(<App/>, document.getElementById('app'));
