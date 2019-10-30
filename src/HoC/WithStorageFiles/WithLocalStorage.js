// @flow
import React from 'react';
// import type { Component } from 'react';
import FilesStorage from '../../Services/FilesStorage';

type withLocalStorageProps = {| storage: FilesStorage |}

function withLocalStorage<Props> (WrappedComponent: Component<{| ...Props, ...withLocalStorageProps |}>) {
  const storage = new FilesStorage(localStorage);

  return function WithLocalStorage(props: Props) {
    return <WrappedComponent {...props} storage={storage}/>
  };
}

export default withLocalStorage;
