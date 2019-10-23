// @flow
import React from 'react';

import styles from './Button.module.scss';

type Props = {
  secondary: boolean,
  className: string,
  onClick: (Event) => void,
}

const Button = (props: Props): React$Node => {
  const { className, secondary, ...rest } = props;
  const classNames = [ styles.button, secondary ? styles['button--secondary'] : '', className];
  return <button {...rest} className={classNames.join(' ')}/>;
};

Button.defaultProps = {
  secondary: false,
  className: '',
  onClick: () => {},
};

export default Button;