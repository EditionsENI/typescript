"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaCollection = void 0;
class SchemaCollection {
    static #instance;
    #schemas;
    constructor() {
        this.#schemas = new Map();
    }
    static getInstance() {
        if (!this.#instance) {
            this.#instance = new SchemaCollection();
        }
        return this.#instance;
    }
    add(schemaName, propertyName, options) {
        const schema = this.#schemas.get(schemaName) || {};
        this.#schemas.set(schemaName, {
            ...schema,
            [propertyName]: options
        });
    }
    has(schemaName) {
        return this.#schemas.has(schemaName);
    }
    getJsonSchema(schemaName) {
        const schema = this.#schemas.get(schemaName);
        if (!schema)
            throw new Error(`Unknown schema: ${schemaName}`);
        const jsonSchema = {};
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
exports.SchemaCollection = SchemaCollection;
//# sourceMappingURL=schemaCollection.js.map