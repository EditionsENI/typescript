import { JsonSchema, Schema, SchemaPropertyOptions } from "./types";

export class SchemaCollection {
  static #instance: SchemaCollection;

  #schemas: Map<string, Schema>;

  private constructor() {
    this.#schemas = new Map();
  }

  static getInstance(): SchemaCollection {
    if (!this.#instance) {
      this.#instance = new SchemaCollection();
    }

    return this.#instance;
  }

  add(schemaName: string, propertyName: string, options: SchemaPropertyOptions) {
    const schema = this.#schemas.get(schemaName) || {};

    this.#schemas.set(schemaName, {
      ...schema,
      [propertyName]: options
    });
  }

  has(schemaName: string) {
    return this.#schemas.has(schemaName);
  }

  getJsonSchema(schemaName: string) {
    const schema = this.#schemas.get(schemaName);

    if (!schema)
      throw new Error(`Unknown schema: ${schemaName}`);

    const jsonSchema: JsonSchema = {};

    for (const key in schema) {
      const { from, type, optional, description, ...otherProps } = schema[key];

      const jsonSchemaProperty = jsonSchema[from] || {
        type: 'object',
        properties: {},
        required: []
      };

      jsonSchemaProperty.properties[key] = { type, description, ...otherProps };
      jsonSchema[from] = jsonSchemaProperty;
      
      if (!optional) {
        jsonSchemaProperty.required.push(key);
      }
    }
    return jsonSchema;
  }
}
