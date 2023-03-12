type SchemaIntegerProperty = {
  type: 'integer';
  minimum?: number;
};

type SchemaStringProperty = {
  type: 'string';
  pattern?: string;
}

type SchemaBaseProperty = {
  description: string;
}

export type SchemaPropertyOptions = SchemaBaseProperty & (SchemaIntegerProperty | SchemaStringProperty);

export interface Schema {
  body: {
    type: 'object',
    properties: Record<string, SchemaPropertyOptions>,
    required: Array<string>
  },
}