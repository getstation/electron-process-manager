import React from 'react';
import PropTypes from 'prop-types';

import ProcessRow from './ProcessRow';

export default class ProcessTable extends React.Component {
  static propTypes = {
    processData: PropTypes.arrayOf(PropTypes.object),
    selectedPid: PropTypes.number,
    onSelectedPidChange: PropTypes.func
  }

  render() {
    return (
      <table className="process-table table-striped">
        <thead>
          <tr>
            <th>Pid</th>
            <th>Process Type</th>
            <th>Private Memory</th>
            <th>Shared Memory</th>
            <th>Working Set Size</th>
            <th>WebContents Id</th>
            <th>WebContents Type</th>
            <th>WebContents URL</th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.processData.map(p =>
            <ProcessRow
              key={p.pid}
              {...p}
              onSelect={() => this.props.onSelectedPidChange(p.pid,p.webContents?p.webContents[0].id:undefined)}
              selected={this.props.selectedPid === p.pid}
            />
          )
        }
        </tbody>
      </table>
    )
  }
}
