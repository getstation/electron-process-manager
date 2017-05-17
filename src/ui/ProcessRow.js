import React from 'react';
import PropTypes from 'prop-types';


export default class ProcessRow extends React.Component {
  static propTypes = {
    pid: PropTypes.number,
    type: PropTypes.string,
    memory: PropTypes.shape({
      peakWorkingSetSize: PropTypes.number,
      privateBytes: PropTypes.number,
      sharedBytes: PropTypes.number,
      workingSetSize: PropTypes.number
    })
  }

  render() {
    return (
      <tr>
        <td>{this.props.pid}</td>
        <td>{this.props.type}</td>
        <td>{this.props.memory.privateBytes}</td>
      </tr>
    )
  }
}
