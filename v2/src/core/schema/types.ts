type SchemaBaseProperty = {
  description: string;
};

type SchemaIntegerProperty = {
  type: "integer";
  minimum?: number;
};

type SchemaStringProperty = {
  type: "string";
  pattern?: string;
};

export type SchemaPropertyOptions = SchemaBaseProperty & (
  SchemaIntegerProperty | SchemaStringProperty
);

export type Schema = {
  body: {
    type: 'object',
    properties: Record<string, SchemaPropertyOptions>,
    required: Array<string>
  },
}
