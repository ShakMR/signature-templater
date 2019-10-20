import React from 'react';

import Button from './Components/Button';
import FileUploadButton from './Components/Button/FileUploadButton';
import Input from "./Components/Input";

import styles from './Main.module.scss';

const Main = () => {
  return (
    <div className={styles.app}>
      <div className={styles.column}>
        <h1>
          Suilabs Signature templater app
        </h1>
      </div>
      <div className={styles.column}>
        <div className={styles.row}>
          <h2>
            Use one of the options below to start with.
          </h2>
        </div>
        <div className={styles.row}>
          <FileUploadButton secondary>1. UploadTemplate ✔️</FileUploadButton>
        </div>
        <div className={styles.row}>
          <Input labelText="2. Template Url"/>
        </div>
        <div className={styles.row}>
          <Button secondary disabled>3. Choose Stored Template</Button>
        </div>
        <div className={styles.row}>
          <Button >GO!</Button>
        </div>
      </div>
    </div>
  );
}

export default Main;
