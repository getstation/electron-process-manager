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
    }),
    webContents: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string,
      URL: PropTypes.string
    }))
  }

  render() {
    const { webContents } = this.props;
    if (!webContents || webContents.length === 0) {
      return (
        <tr>
          <td>{this.props.pid}</td>
          <td>{this.props.type}</td>
          <td>{this.props.memory.privateBytes}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      )
    } else {
      // FIX ME: we consider we have only have 1 webContents per process
      const wc = webContents[0];
      return (
        <tr>
          <td>{this.props.pid}</td>
          <td>{this.props.type}</td>
          <td>{this.props.memory.privateBytes}</td>
          <td>{wc.id}</td>
          <td>{wc.type}</td>
          <td>{wc.URL}</td>
        </tr>
      )
    }
  }
}
