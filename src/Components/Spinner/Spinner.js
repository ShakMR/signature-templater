import React from 'react';

import styles from './Spinner.module.scss';

const Spinner = () => <span className={styles.spinner} role="img" aria-label="spinner">🌀</span>;

export default Spinner;