// @flow
import uuid from 'uuid/v4';
import type { Field } from '../Types/Field';

type ObjectConfigParam = {
  name: string,
  related: string,
  relation: string,
};

type ConfigValue = {
  id: string,
  params: Array<string | ObjectConfigParam>
};

type ParserConfig = {
  [key: string]: ConfigValue
};

type RelationFunction = (any) => { key: string, value: any };
type BuildRelationFunction = (any, string, string) => RelationFunction;

export default class {
  config: ParserConfig;
  relationsMap: Map<string, BuildRelationFunction>;

  constructor(config: ParserConfig) {
    this.config = config;
    this.relationsMap = new Map<string, BuildRelationFunction>();
    this.relationsMap.set('maintainRatio', this.maintainRatio);
  }

  parseContent(htmlString: string):  { fields: Array<Field>, html: string }  {
    const root = document.createElement('div');
    root.innerHTML = htmlString;

    const retElements = [];
    const configKeys = Object.keys(this.config);
    configKeys.forEach((configKey: string) => {
      const elements = root.getElementsByTagName(configKey);
      for (let element of elements) {
        const parameters = this.extractElementInformation(element, root);
        retElements.push(...parameters);
      }
    });
    retElements.sort((a: Field, b: Field) => a.position - b.position);
    return { fields: retElements, html: root.innerHTML };
  }

  extractElementInformation(element: any, root: HTMLDivElement): Array<Field> {
    const tag = element.tagName.toLowerCase();
    const { id: idParam, params } = this.config[tag];
    if (!element.id && element[idParam]) {
      element.id = element[idParam];
    } else {
      element.id = uuid();
    }
    const position = root.innerHTML.indexOf(element.id);
    return params.map((param: string | ObjectConfigParam) => {
      const paramType = typeof param;
      let ret = { id: element.id, tag, position };
      if (paramType === 'string') {
        ret = { ...ret, ...this.resolveStringParam(element, param) };
      } else if (paramType === 'object') {
        ret = { ...ret, ...this.resolveObjectParam(element, param) };
      }
      return ret;
    });
  }

  maintainRatio: BuildRelationFunction = (element: any, param1: string, param2: string): RelationFunction => {
    const ratio = element[param1] / element[param2];
    return (currentValue: number) => {
      const newValue = Math.round(currentValue / ratio);
      return { key: `${element.id}|${param2}`, value: newValue };
    };
  };

  resolveStringParam(element: any, param: string): Field {
    const value = element[param].replace(/[\t\n]/g,'');
    return ({ param, value })
  }

  resolveObjectParam(element: any, param: ObjectConfigParam): Field {
    const value = element[param.name];
    let func: RelationFunction;
    if (Object.getOwnPropertyNames(this).includes(param.relation)) {
      const auxFunc: ?BuildRelationFunction = this.relationsMap.get(param.relation);
      if (auxFunc) {
        func = auxFunc(element, param.name, param.related);
      }
    } else {
      throw new Error (`function '${param.relation}' not implemented`);
    }
    return ({ param: param.name, value, func })
  }
}