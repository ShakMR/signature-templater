import React, { Component } from 'react';

import Input from './Components/Input';
import Button from './Components/Button';
import LoadFile from './Services/LoadFile';
import HTMLParserConfig from './HTMLParser.config';
import HTMLParserService from './Services/HTMLParser';
import type { Field } from './Types/Field';

import style from './Form.module.scss';
import Preview from './Components/HTMLPreview/HTMLPreview';

type State = {
  fields: Array<Field>,
  changed: string,
  html: string,
}

class Form extends Component<null, State> {
  state = {
    fields: [],
    changed: null
  };

  parser = new HTMLParserService(HTMLParserConfig);

  parseTemplate = async (location) => {
    const searchParams = new URLSearchParams(location.search);
    const filePath = searchParams.get('file');
    const type = searchParams.get('type');
    const fileContent = type && type === 'url'
      ? await LoadFile.loadFromURL(filePath)
      : await LoadFile.loadFromFile(filePath);
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
                    <Input onChange={this.inputChange} onBlur={this.clearChanged} labelText={`${field.tag} ${field.param}`} name={key} value={field.value}/>
                  </div>
                )
              }
            )
          }
          <div className={style.row}>
            <Button>Done</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;