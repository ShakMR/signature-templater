declare module 'html-parsing' {
  declare type RelationFunctionResponse = {
    key: string,
    value: number | string,
  };

  declare type Field = {
    id: string,
    tag: string,
    value: string,
    param: string,
    func?: (value: number | string) => RelationFunctionResponse,
    position: number,
  };

  declare type ScrollComponents = HTMLElement & {
    scrollLeft: number,
    scrollTop: number,
  }

  declare type HTMLDocument = Document & {
    documentElement: ScrollComponents | null,
  }

  declare type ObjectConfigParam = {
    name: string,
    related: string,
    relation: string,
  };

  declare type ConfigValue = {
    id: string,
    params: Array<string | ObjectConfigParam>
  };

  declare type ParserConfig = {
    [key: string]: ConfigValue
  };

  declare type RelationFunction = (any) => { key: string, value: any };
  declare type BuildRelationFunction = (any, string, string) => RelationFunction;
}
