export type HttpVerb = "get" | "post" | "patch";

export interface IController<TModel = unknown> {
  getAll(test: any): Promise<ReadonlyArray<Readonly<TModel>>>;
  post(model: TModel): Promise<void>;
}

export interface IAction {
  controller: string;
  method: string;
}

export interface IRoute extends IAction {
  httpVerb: HttpVerb;
  path: string;
}

type SchemaFrom = 'params' | 'querystring' | 'body';

type SchemaPropertyIntOptions = {
  type: 'integer';
  minimum?: number;
};

type SchemaPropertyStringOptions = {
  type: 'string';
  pattern?: string;
}

type SchemaPropertyBaseOptions = {
  description: string;
  optional?: true;
  from: SchemaFrom;
}

export type SchemaPropertyOptions = SchemaPropertyBaseOptions & (SchemaPropertyIntOptions | SchemaPropertyStringOptions);

export interface Schema {
  [key: string]: SchemaPropertyOptions
}

export interface JsonSchemaProperty {
  type: 'object',
  properties: { [key: string]: {
    type: 'integer' | 'string',
    description?: string;
  }}
  required: Array<string>
}

export interface JsonSchema {
  body?: JsonSchemaProperty,
  params?: JsonSchemaProperty,
  querystring?: JsonSchemaProperty
}
