"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const schemaCollection_1 = require("../schema/schemaCollection");
const Model = (ctor) => {
    return (target, { name, addInitializer }) => {
        addInitializer(function () {
            new ctor();
            schemaCollection_1.SchemaCollection.getInstance().bind(`${this.constructor.name}#${name.toString()}`, ctor.name);
            const originalMethod = this[name];
            const executeWithModel = (req) => {
                const model = Object.assign(Object.assign(Object.assign({}, req.body), req.query), req.params);
                return originalMethod.bind(this)(model);
            };
            this[name] = executeWithModel.bind(this);
        });
    };
};
exports.Model = Model;
