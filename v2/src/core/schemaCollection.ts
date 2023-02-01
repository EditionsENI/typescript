import { JsonSchema, JsonSchemaProperty, Schema, SchemaPropertyOptions } from "./types";

export class SchemaCollection {
  static #instance: SchemaCollection;

  #schemas: Map<string, Schema>;
  #actionBindings: Map<`${string}#${string}`, string>;

  get schemas() {
    return this.#schemas;
  }

  get actionBindings() {
    return this.#actionBindings;
  }
  
  private constructor() {
    this.#schemas = new Map();
    this.#actionBindings = new Map();
  }

  static getInstance(): SchemaCollection {
    if(!this.#instance) {
        this.#instance = new SchemaCollection();
    }

    return this.#instance;
  }

  add(schemaKey: string, propertyKey: string, options: SchemaPropertyOptions) {
    const schema = this.#schemas.get(schemaKey) || {};

    this.#schemas.set(schemaKey, {
      ...schema,
      [propertyKey]: options
    });
  }

  bind(actionKey: `${string}#${string}`, schemaKey: string) {
    this.#actionBindings.set(actionKey, schemaKey);
  }

  #mapToJsonSchema(schema: Schema) {
    const jsonSchema: JsonSchema = { };

    for(const key in schema) {
      const { from, type, optional, description, ...otherProps } = schema[key];

      const jsonSchemaProperty = jsonSchema[from] || {
        type: 'object',
        properties: {},
        required: []
      };

      jsonSchemaProperty.properties[key] = { type, description, ...otherProps };
      jsonSchema[from] = jsonSchemaProperty;
      if(!optional) {
        jsonSchemaProperty.required.push(key);
      }
    }

    return jsonSchema;
  }

  getByAction(controllerKey: string, actionKey: string) {
    const schemaKey = this.#actionBindings.get(`${controllerKey}#${actionKey}`);

    if(!schemaKey)
      return;

    const schema = this.#schemas.get(schemaKey);

    if(!schema)
      return;

    return this.#mapToJsonSchema(schema);
  }
}
