// @flow
import uuid from 'uuid/v4';
import type { Field } from '../Types/Field';

export default class {
  constructor(config) {
    this.config = config;
  }


  parseContent(htmlString: string): { fields: Array<Field>, html: string } {
    const root = document.createElement('div');
    root.innerHTML = htmlString;
    return { fields: this.findConfigurableElements(root), html: root.innerHTML };
  }

  findConfigurableElements(root: HTMLElement): Array<Field> {
    const retElements = [];
    const configKeys = Object.keys(this.config);
    configKeys.forEach((configKey) => {
      const elements = root.getElementsByTagName(configKey);
      for (let element of elements) {
        const parameters = this.extractElementInformation(element);
        retElements.push(...parameters);
      }
    });
    return retElements;
  }

  extractElementInformation(element: HTMLElement): Array<Field> {
    const tag = element.tagName.toLowerCase();
    const { id: idParam, params } = this.config[tag];
    if (element[idParam]) {
      element.id = idParam;
    } else if (element.name) {
      element.id = element.name;
    } else {
      element.id = uuid();
    }
    return params.map((param) => {
      const value = element[param].replace(/[\t\n]/g,'');
      return ({ id: element.id, tag, param, value })
    })
  }
}