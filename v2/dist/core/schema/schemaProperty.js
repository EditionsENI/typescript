"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaProperty = void 0;
const schemaCollection_1 = require("./schemaCollection");
const SchemaProperty = (options) => {
    return (target, { name, addInitializer }) => {
        addInitializer(function () {
            schemaCollection_1.SchemaCollection.getInstance().add(this.constructor.name, name.toString(), options);
        });
    };
};
exports.SchemaProperty = SchemaProperty;
//# sourceMappingURL=schemaProperty.js.map