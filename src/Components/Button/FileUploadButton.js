// @flow
import React, { Component, Fragment } from 'react';
import type { ReactRef } from '../../Types/Ref';

import Button from './Button';

type UploadFileEvent = {
  target: {
    files: FileList,
  },
};

type Props = {
  onFileSelected: (UploadFileEvent) => void,
}

class FileUploadButton extends Component<Props> {
  inputRef: ReactRef;

  constructor(props: Props) {
    super(props);

    this.inputRef = React.createRef();
  }

  onButtonClick = (): void => {
    this.inputRef.current.click();
  };

  render() {
    return <Fragment>
      <Button onClick={this.onButtonClick} {...this.props} />
      <input onChange={this.props.onFileSelected} ref={this.inputRef} id="file-input" type="file" name="file" style={{ display: 'none' }}/>
    </Fragment>;
  }
}

export default FileUploadButton;
