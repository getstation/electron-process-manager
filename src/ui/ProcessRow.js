import React from 'react';
import PropTypes from 'prop-types';
import filesize from 'filesize';

const KB = 1024;

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
          <td>{filesize(this.props.memory.privateBytes*KB)}</td>
          <td>{filesize(this.props.memory.sharedBytes*KB)}</td>
          <td>{filesize(this.props.memory.workingSetSize*KB)}</td>
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
          <td>{filesize(this.props.memory.privateBytes*KB)}</td>
          <td>{filesize(this.props.memory.sharedBytes*KB)}</td>
          <td>{filesize(this.props.memory.workingSetSize*KB)}</td>
          <td>{wc.id}</td>
          <td>{wc.type}</td>
          <td>{wc.URL}</td>
        </tr>
      )
    }
  }
}
