// @flow
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import type { RouterHistory } from 'react-router-dom';
import type { FilesStorage } from 'types/storage';

import Button from './Components/Button';
import FileUploadButton from './Components/Button/FileUploadButton';
import Input, { INPUT_TYPES } from "./Components/Input";
import LoadFile from './Services/LoadFile';
import Spinner from './Components/Spinner/Spinner';

import withLocalStorage from './HoC/WithStorageFiles';

import styles from './Main.module.scss';
import StoredFileSelectorModal from './Components/Modal/StoredFileSelectorModal';

type State = {
  filenameSelected: ?string,
  savingFile: boolean,
  isModalOpen: boolean
}

type Props = {
  history: RouterHistory,
  storage: FilesStorage,
};

type UploadFileEvent = {
  target: {
    files: FileList,
  },
};

type InputRef = {| current: null | HTMLInputElement |};

class Main extends Component<Props, State> {
  inputRef: InputRef = React.createRef();
  state: State = {
    filenameSelected: null,
    savingFile: false,
    isModalOpen: false,
  };

  onFileSelected = (e: UploadFileEvent): void => {
    const file: File = e.target.files[0];
    this.setState({
      savingFile: true,
    }, async () => {
      const fileContent = await LoadFile.loadFromFile(file);
      await this.props.storage.save(file.name, fileContent);
      this.setState({
        savingFile: false,
        filenameSelected: file.name,
      });
    })
  };

  clearSelectedFile = (): void => {
    this.setState({
      filenameSelected: null,
    });
  };

  onURLFinished = (): void => {
    if (this.inputRef.current) {
      const fileURL: string = this.inputRef.current.value;
      this.setState({
        savingFile: true,
      }, async () => {
        const fileContent = await LoadFile.loadFromURL(fileURL);
        const filename = fileURL.split('/').pop();
        await this.props.storage.save(filename, fileContent);
        this.setState({
          savingFile: false,
          filenameSelected: filename,
        });
      });
    }
  };

  switchModalState = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  };

  handleFileSelectedFromStorage = async (filename: string) => {
    this.setState({
      filenameSelected: filename,
    });
  };

  navigateForward = () => {
    if (this.state.filenameSelected) {
      this.props.history.push(`/form?file=${this.state.filenameSelected}`);
    }
  };

  render() {
    const { savingFile, filenameSelected, isModalOpen } = this.state;
    return (
      <div className={styles.app}>
        <div className={styles.column}>
          <h1>
            Suilabs Signature templater app
          </h1>
        </div>

        <div className={styles.column}>
          {
            savingFile
              ? <div className={styles.row}><Spinner /></div>
            : filenameSelected
              ? <div className={styles.row}><h3>File selected: {filenameSelected}</h3></div>
              : <Fragment>
                  <div className={styles.row}>
                    <h2>
                      Use one of the options below to start with.
                    </h2>
                  </div>
                  <div className={styles.row}>
                    <FileUploadButton secondary onFileSelected={this.onFileSelected}>1. UploadTemplate</FileUploadButton>
                  </div>
                  <div className={styles.row}>
                    <Input type={INPUT_TYPES.CONFIRMATION} ref={this.inputRef} onFinishedClick={this.onURLFinished} labelText="2. Template Url"/>
                  </div>
                  <div className={styles.row}>
                    <Button secondary onClick={this.switchModalState}>3. Choose Stored Template</Button>
                  </div>
              </Fragment>
          }
          <div className={[styles.row, filenameSelected && styles['buttons-row']].join(' ')}>
            { filenameSelected && <Button onClick={this.clearSelectedFile}>Back</Button> }
            <Button onClick={this.navigateForward} disabled={!filenameSelected}>
              GO!
            </Button>
          </div>
        </div>
        { isModalOpen && <StoredFileSelectorModal opened={false} onSelect={this.handleFileSelectedFromStorage} onClose={this.switchModalState} /> }
      </div>
    );
  }
}

export default withRouter(withLocalStorage(Main));
