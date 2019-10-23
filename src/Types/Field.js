type RelationFunctionResponse = {
  key: string,
  value: number | string,
};

export type Field = {
  id: string,
  tag: string,
  value: string,
  param: string,
  func?: (value: number | string) => RelationFunctionResponse,
  position?: number,
}
