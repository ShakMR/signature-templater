// @flow
import React, { Component } from 'react';
import type { Element, ElementRef } from 'react';
import type { Field } from '../../Types/Field';

import style from './HTMLPreview.module.scss';

type Props = {
  html: string,
  vars: Array<Field>,
  changed: string,
}

type State = {
  fragment: HTMLElement,
  elementsById: Map<string, HTMLElement>,
};

function offset(el) {
  var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

class Preview extends Component<Props, State> {
  highlighter: ElementRef;

  static defaultProps = {
    html: '',
    vars: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      fragment: document.createElement('div'),
      elementsById: {},
    };
    this.highlighter = React.createRef();
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    let nextState;
    const { fragment, elementsById } = this.state;
    if (nextProps.html) {
      fragment.innerHTML = nextProps.html;
      for (let el of fragment.getElementsByTagName('*')) {
        elementsById[el.id] = el;
      }
      nextState = {
        fragment,
        elementsById
      };
    }
    if (nextProps.changed || fragment.innerHTML === '') {
      nextProps.vars.forEach(({ id, param, value }: Field) => {
        elementsById[id][param] = value;
      });
      nextState = {
        elementsById,
      };
    }
    if (!nextState) {
      return;
    }
    this.setState(nextState);
  }

  render(): Element {
    if (!this.props.html) {
      return '';
    }
    const { fragment } = this.state;
    return <div>
      <div className={style.highlighter} ref={this.highlighter} />
      <div dangerouslySetInnerHTML={{ __html: fragment.innerHTML }}/>
    </div>;
  }

  componentDidUpdate(): void {
    if (this.highlighter.current && this.props.changed) {
      const highlighter = this.highlighter.current;
      const changedElement = document.getElementById(this.props.changed);
      const elementOffset = offset(changedElement);
      highlighter.style.top = `${elementOffset.top}px`;
      highlighter.style.left = `${elementOffset.left}px`;
      highlighter.style.height = `${changedElement.offsetHeight}px`;
      highlighter.style.width = `${changedElement.offsetWidth}px`;
    }
  }
}


export default Preview;