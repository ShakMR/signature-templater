// @flow
import React from 'react';
import type { Node } from 'react';

import styles from './List.module.scss';

type Props = {
  elements: Array<string>,
  onItemClick: (index: string) => void,
}

const List = ({ elements, onItemClick } : Props): Node => (
  <ul className={styles.list}>
    {
      elements.map((item: string, index: number) => (
        <div key={item} className={styles.anchor} role="button" onClick={() => onItemClick(index)}>
          <li className={styles['list-item  ']}>
            {item}
          </li>
        </div>
      ))
    }
  </ul>
);

export default List;
