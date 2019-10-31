// @flow
import React, { Component } from 'react';
import type { Field, HTMLDocument } from 'html-parsing';
import type { ReactRef } from 'react-helpers';

import Button from '../Button';

import style from './HTMLPreview.module.scss';

type Props = {
  html: string,
  vars: Array<Field>,
  changed: string,
}

type State = {
  fragment: HTMLElement,
  elementsById: any,
};

function offset(el: ?HTMLElement): { top: number, left: number } {
  if (!el) return { top: 0, left: 0 };
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || ((document: HTMLDocument).documentElement || {} ).scrollLeft;
  const scrollTop = window.pageYOffset || ((document: HTMLDocument).documentElement || {} ).scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

class HTMLPreview extends Component<Props, State> {
  highlighter: ReactRef;

  static defaultProps = {
    html: '',
    vars: {},
  };

  constructor(props: Props) {
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
        if (el.tagName === 'IMG') {
          el.addEventListener('load', () => {
            console.log('finished loading');
            this.forceUpdate();
          })
        }
        elementsById[el.id] = el;
      }
      nextState = {
        fragment,
      };
    }
    nextProps.vars.forEach(({ id, param, value }: Field) => {
      elementsById[id][param] = value;
    });
    nextState = {
      ...nextState,
      elementsById,
    };
    if (!nextState) {
      return;
    }
    this.setState(nextState);
  }

  displayNewTemplate = (): void => {
    const newWindow: window = window.open();
    newWindow.document.write(this.state.fragment.innerHTML);
  };

  render() {
    if (!this.props.html) {
      return '';
    }
    const { fragment } = this.state;
    return <div>
      <div className={style.highlighter} ref={this.highlighter} />
      <div dangerouslySetInnerHTML={{ __html: fragment.innerHTML }}/>
      <div className={style["done-wrapper"]}>
        <Button onClick={this.displayNewTemplate}>Done</Button>
      </div>
    </div>;
  }

  componentDidUpdate(): void {
    if (this.highlighter.current && this.props.changed) {
      setTimeout(() => {
        const highlighter = this.highlighter.current || {};
        const changedElement: ?HTMLElement = document.getElementById(this.props.changed);
        const elementOffset = offset(changedElement);
        highlighter.style.top = `${elementOffset.top}px`;
        highlighter.style.left = `${elementOffset.left}px`;
        highlighter.style.height = `${(changedElement || {}).offsetHeight}px`;
        highlighter.style.width = `${(changedElement || {}).offsetWidth}px`;
        highlighter.style.opacity = '1';
      }, 250);
    } else if (this.highlighter.current && !this.props.changed) {
      this.highlighter.current.style.opacity = '0';
    }
  }
}


export default HTMLPreview;
