// @flow
import React from 'react';
import type { Component } from 'react';
import type { FilesStorage as FilesStorageType } from 'types/storage';

import FilesStorage from '../../Services/FilesStorage';

type withLocalStorageProps = {| storage: FilesStorageType |}

function withLocalStorage<Props> (WrappedComponent: Class<Component<{| ...Props, ...withLocalStorageProps |}>>) {
  const storage = new FilesStorage(localStorage);

  return function WithLocalStorage(props: Props) {
    return <WrappedComponent {...props} storage={storage}/>
  };
}

export default withLocalStorage;
