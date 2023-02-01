"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const schemaCollection_1 = require("./schemaCollection");
const Model = (ctor) => {
    return (target, { name, addInitializer }) => {
        addInitializer(function () {
            new ctor();
            schemaCollection_1.SchemaCollection.getInstance().bind(`${this.constructor.name}#${name.toString()}`, ctor.name);
            // Let's keep the original method to call it later.
            const originalMethod = this[name];
            // We need a new method to bind the request data to the model
            // Now we gonna define a new method to execute
            const validateModel = () => {
                // Create a new instance of the model
                return originalMethod();
            };
            // Replace the method on the instance
            this[name] = validateModel.bind(this);
        });
    };
};
exports.Model = Model;
