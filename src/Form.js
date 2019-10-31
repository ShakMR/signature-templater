import React, { Component } from 'react';
import type { Field } from 'html-parsing';

import Input from './Components/Input';
import HTMLParserConfig from './HTMLParser.config';
import HTMLParserService from './Services/HTMLParser';
import Preview from './Components/HTMLPreview/HTMLPreview';
import withLocalStorage from './HoC/WithStorageFiles';

import style from './Form.module.scss';

type State = {
  fields: Array<Field>,
  changed: string,
  html: string,
}

const keywords = {
  a: 'link',
  href: 'url',
  img: 'image',
  src: 'source',
  innerHTML: 'displayable text',
  width: 'width',
  height: 'height',
};

const findReplacement = (keyword) => {
  return keywords[keyword] || keyword;
};

class Form extends Component<null, State> {
  state = {
    fields: [],
    changed: null
  };

  parser = new HTMLParserService(HTMLParserConfig);

  parseTemplate = async (location) => {
    const searchParams = new URLSearchParams(location.search);
    const filename = searchParams.get('file');
    const fileContent = await this.props.storage.get(filename);
    return this.parser.parseContent(fileContent);
  };

  async componentDidMount(): void {
    const {fields, html} = await this.parseTemplate(this.props.location);
    this.setState({
      fields,
      html,
    });
  }

  inputChange = ({ target: { name, value } }: Event): void => {
    const [id, param] = name.split('|');
    const { fields } = this.state;
    const index = fields.findIndex((field) => field.id === id && field.param === param);
    fields[index] = {
      ...fields[index],
      value
    };
    this.setState({
      fields,
      changed: id,
    });
  };

  relatedChange = (func) => ({ target: { name, value } }: Event): void => {
    const relatedParamChange = func(value);
    this.inputChange({target: { name, value }});
    this.inputChange({target: { name: relatedParamChange.key, value: relatedParamChange.value }})
  };

  inputChangeFactory = (func) => {
    console.log(func);
    if (!func) {
      return this.inputChange;
    }
    return this.relatedChange(func);
  };

  clearChanged = (): void => {
    console.log('clear');
    this.setState({
      changed: null,
    });
  };

  render() {
    const { fields, html, changed } = this.state;
    return (
      <div className={style.app}>
        <div className={style.column}>
          <h2>Preview</h2>
          <Preview html={html} vars={fields} changed={changed}/>
        </div>
        <div className={style.column}>
          <h2>Template Data</h2>
          {
            fields.map(
              (field: Field) => {
                const key = `${field.id}|${field.param}`;
                return (
                  <div key={key} className={style.form__row}>
                    <Input
                      onChange={this.inputChangeFactory(field.func)}
                      onBlur={this.clearChanged}
                      labelText={`${findReplacement(field.tag)} ${findReplacement(field.param)}`}
                      name={key} value={field.value}
                    />
                  </div>
                )
              }
            )
          }
        </div>
      </div>
    );
  }
}

export default withLocalStorage(Form);
