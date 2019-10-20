// @flow
import React, { Component, Fragment } from 'react';
import type { ElementRef } from 'react';

import Button from './Button';

type Props = {
  onFileSelected: (FileList) => void,
}

class FileUploadButton extends Component<Props> {
  inputRef: ElementRef;

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
