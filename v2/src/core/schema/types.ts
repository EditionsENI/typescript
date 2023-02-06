
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

interface JsonSchemaProperty {
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