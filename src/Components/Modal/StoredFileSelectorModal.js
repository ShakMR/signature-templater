import React, { Component } from 'react';
import Button from '../Button';
import FilenameList from '../List/FilenameList';

import styles from './StoredFileSelectorModal.module.scss';

type Props = {
  onSelect: (filename: string) => void,
  onClose: () => void,
};

type State = {
  closing: boolean,
};

class StoredFileSelectorModal extends Component<Props, State> {
  state = {
    closing: false,
  };

  closeAndCall = (callback) => (filename: string) => {
    this.setState({
      closing: true,
    }, () => {
      setTimeout(callback, 300, filename);
    })
  };

  render() {
    const { onSelect, onClose } = this.props;
    const { closing } = this.state;
    return (
      <div className={[styles.modal, closing && styles['fade-out']].join(' ')}>
        <Button onClick={this.closeAndCall(onClose)}>Close</Button>
        <FilenameList onSelect={this.closeAndCall(onSelect)}/>
      </div>
    )
  }
}

export default StoredFileSelectorModal;
