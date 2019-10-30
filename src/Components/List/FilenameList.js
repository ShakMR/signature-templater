// @flow
import React, { Component } from 'react';
import FilesStorageInterface from '../../Services/FilesStorageInterface';
import withLocalStorage from '../../HoC/WithStorageFiles';
import List from './List';

type State = {
  filenames: Array<string>,
};

type Props = {
  storage: FilesStorageInterface,
  onSelect: (filename: string) => void,
};

class FilenameList extends Component<Props, State> {
  state = {
    filenames: [],
  };

  onSelect = (index: number) => {
    this.props.onSelect(this.state.filenames[index]);
  };

  render() {
    const { filenames } = this.state;
    return (
      <List elements={filenames} onItemClick={this.onSelect}/>
    )
  }

  async componentDidMount () {
    console.log(this.props);
    const filenames = await this.props.storage.getAllFileNames();
    this.setState({
      filenames,
    });
  }
}

export default withLocalStorage(FilenameList);
