// @flow
import React, { Component, Fragment } from 'react';
import type { ReactRef } from 'react-helpers';
import type { UploadFileEvent } from 'html-helpers';

import Button from './Button';
import type { Node } from 'react';

type Props = {
  onFileSelected: (UploadFileEvent) => void,
  children: Node,
}

class FileUploadButton extends Component<Props> {
  inputRef: ReactRef;

  constructor(props: Props) {
    super(props);

    this.inputRef = React.createRef();
  }

  onButtonClick = (): void => {
    if (this.inputRef.current) {
      this.inputRef.current.click();
    }
  };

  render() {
    const { onFileSelected, children, ...rest } = this.props;
    return <Fragment>
      <Button onClick={this.onButtonClick} {...rest}>
        {children}
      </Button>
      <input onChange={onFileSelected} ref={this.inputRef} id="file-input" type="file" name="file" style={{ display: 'none' }}/>
    </Fragment>;
  }
}

export default FileUploadButton;
