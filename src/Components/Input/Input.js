// @flow
import React from 'react';

import styles from './Input.module.scss';

type Props = {
  className: string,
  labelText: string,
  onFinishedClick: () => void,
  type: string
};

export const INPUT_TYPES = {
  CONFIRMATION: 'confirmation',
};

const Input = (props: Props, ref) => {
  const { className, labelText, type, onFinishedClick, ...rest } = props;
  const classNames = [styles.input, className];
  return (<div>
    <label className={styles.label}>
      {labelText}
    </label>
    <div className={styles['input-wrapper']}>
      <input {...rest} ref={ref} className={classNames.join(' ')} />
      { type === INPUT_TYPES.CONFIRMATION && <button className={styles['input__button']} onClick={onFinishedClick}><span role="img" aria-label="done">👍</span></button> }
    </div>
  </div>);
};

Input.defaultTypes = {
  className: '',
  type: null,
};

export default React.forwardRef<Props, HTMLInputElement>(Input);
