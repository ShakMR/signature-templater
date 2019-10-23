// @flow
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Button from './Components/Button';
import FileUploadButton from './Components/Button/FileUploadButton';
import Input, { INPUT_TYPES } from "./Components/Input";
import LoadFile from './Services/LoadFile';
import FileStorage from './Services/FileStorage';
import Spinner from './Components/Spinner/Spinner';

import styles from './Main.module.scss';
import type { ReactRef } from './Types/Ref';

type State = {
  filenameSelected: ?string,
  savingFile: boolean,
}

type UploadFileEvent = {
  target: {
    files: FileList,
  },
};

class Main extends Component<{}, State> {
  inputRef: ReactRef = React.createRef();
  state: State = {
    filenameSelected: null,
    savingFile: false,
  };

  onFileSelected = (e: UploadFileEvent): void => {
    const file: File = e.target.files[0];
    this.setState({
      savingFile: true,
    }, async () => {
      const fileContent = await LoadFile.loadFromFile(file);
      FileStorage.save(file.name, fileContent);
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
      const fileURL: string = this.inputRef.current.value;
      this.setState({
        savingFile: true,
      }, async () => {
        const fileContent = await LoadFile.loadFromURL(fileURL);
        const filename = fileURL.split('/').pop();
        FileStorage.save(filename, fileContent);
        this.setState({
          savingFile: false,
          filenameSelected: filename,
        })
      })
  };

  render() {
    const { savingFile, filenameSelected } = this.state;
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
                    <Button secondary disabled>3. Choose Stored Template</Button>
                  </div>
              </Fragment>
          }
          <div className={[styles.row, filenameSelected && styles['buttons-row']].join(' ')}>
            { filenameSelected && <Button onClick={this.clearSelectedFile}>Back</Button> }
            <Link to={filenameSelected && `/form?file=${filenameSelected}`}>
              <Button>
                GO!
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
