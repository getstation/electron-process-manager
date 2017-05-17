import React from 'react';
import PropTypes from 'prop-types';

import ProcessRow from './ProcessRow';

export default class ProcessTable extends React.Component {
  static propTypes = {
    processData: PropTypes.arrayOf(PropTypes.object)
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
            <ProcessRow key={p.pid} {...p} />
          )
        }
        </tbody>
      </table>
    )
  }
}
