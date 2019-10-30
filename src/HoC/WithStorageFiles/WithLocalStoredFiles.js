// @flow
import React from 'react';
import type { Component } from 'react';
import FilesStorageInterface from '../../Services/FilesStorageInterface';
import withLocalStorage from './WithLocalStorage';

type withLocalStoredFilesProps = {| fileStorage: FilesStorageInterface |};

function withLocalStoredFiles<Props>(
  Storage: FilesStorageInterface,
  Component: Component<{| ...Props, ...withLocalStoredFilesProps |}>
): Component<Props> {
  type State = {
    filesStored: Array<string>,
  };

  class WithLocalFilesStorage extends Component<Props, State> {
    state = {
      filesStored: [],
    };

    render() {
      return <Component {...this.props} filesStored={this.state.filesStored} />
    }

    componentWillMount() {
      this.storage.getAllFileNames()
        .then((filenames) => {
          this.setState({
            filesStored: filenames,
          });
        });
    }
  }

  return withLocalStorage<Props>(WithLocalFilesStorage);
}

export default withLocalStoredFiles;
