import React from 'react';
import PropTypes from 'prop-types';

import styles from './Input.module.scss';

const Input = (props) => {
  const { className, labelText, ...rest } = props;
  const classNames = [styles.input, className];
  return (<div>
    <label className={styles.label}>
      {labelText}
    </label>
    <input {...rest} className={classNames.join(' ')} />
  </div>);
};

Input.propTypes = {
  className: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

Input.defaultTypes = {
  className: '',
};

export default Input;