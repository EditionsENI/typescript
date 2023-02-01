"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _SchemaCollection_instances, _a, _SchemaCollection_instance, _SchemaCollection_schemas, _SchemaCollection_actionBindings, _SchemaCollection_mapToJsonSchema;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaCollection = void 0;
class SchemaCollection {
    get schemas() {
        return __classPrivateFieldGet(this, _SchemaCollection_schemas, "f");
    }
    get actionBindings() {
        return __classPrivateFieldGet(this, _SchemaCollection_actionBindings, "f");
    }
    constructor() {
        _SchemaCollection_instances.add(this);
        _SchemaCollection_schemas.set(this, void 0);
        _SchemaCollection_actionBindings.set(this, void 0);
        __classPrivateFieldSet(this, _SchemaCollection_schemas, new Map(), "f");
        __classPrivateFieldSet(this, _SchemaCollection_actionBindings, new Map(), "f");
    }
    static getInstance() {
        if (!__classPrivateFieldGet(this, _a, "f", _SchemaCollection_instance)) {
            __classPrivateFieldSet(this, _a, new SchemaCollection(), "f", _SchemaCollection_instance);
        }
        return __classPrivateFieldGet(this, _a, "f", _SchemaCollection_instance);
    }
    add(schemaKey, propertyKey, options) {
        const schema = __classPrivateFieldGet(this, _SchemaCollection_schemas, "f").get(schemaKey) || {};
        __classPrivateFieldGet(this, _SchemaCollection_schemas, "f").set(schemaKey, Object.assign(Object.assign({}, schema), { [propertyKey]: options }));
    }
    bind(actionKey, schemaKey) {
        __classPrivateFieldGet(this, _SchemaCollection_actionBindings, "f").set(actionKey, schemaKey);
    }
    getByAction(controllerKey, actionKey) {
        const schemaKey = __classPrivateFieldGet(this, _SchemaCollection_actionBindings, "f").get(`${controllerKey}#${actionKey}`);
        if (!schemaKey)
            return;
        const schema = __classPrivateFieldGet(this, _SchemaCollection_schemas, "f").get(schemaKey);
        if (!schema)
            return;
        return __classPrivateFieldGet(this, _SchemaCollection_instances, "m", _SchemaCollection_mapToJsonSchema).call(this, schema);
    }
}
exports.SchemaCollection = SchemaCollection;
_a = SchemaCollection, _SchemaCollection_schemas = new WeakMap(), _SchemaCollection_actionBindings = new WeakMap(), _SchemaCollection_instances = new WeakSet(), _SchemaCollection_mapToJsonSchema = function _SchemaCollection_mapToJsonSchema(schema) {
    const jsonSchema = {};
    for (const key in schema) {
        const _b = schema[key], { from, type, optional, description } = _b, otherProps = __rest(_b, ["from", "type", "optional", "description"]);
        const jsonSchemaProperty = jsonSchema[from] || {
            type: 'object',
            properties: {},
            required: []
        };
        jsonSchemaProperty.properties[key] = Object.assign({ type, description }, otherProps);
        if (!optional) {
            jsonSchemaProperty.required.push(key);
        }
    }
    return jsonSchema;
};
_SchemaCollection_instance = { value: void 0 };
