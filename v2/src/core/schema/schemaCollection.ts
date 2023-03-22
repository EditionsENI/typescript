import type { Schema, SchemaPropertyOptions } from "./types";

export class SchemaCollection {
  static #instance: SchemaCollection;
  #schemas: Map<string, Schema> = new Map();

  private constructor() {

  }

  static getInstance(): SchemaCollection{
    if (!this.#instance) {
      this.#instance = new SchemaCollection();
    }
  
    return this.#instance;
  }  

  add(
    schemaName: string, 
    propertyName: string, 
    options: SchemaPropertyOptions
  ) {
    const schema = this.#schemas.get(schemaName) || {
      body: {
        type: "object",
        properties: {},
        required: []
      },
    } satisfies Schema;

    schema.body.properties[propertyName] = options;
    schema.body.required.push(propertyName);
    this.#schemas.set(schemaName, schema);
  }

  getSchema(schemaName: string) {
    return this.#schemas.get(schemaName);
  }
  
  
}
