"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaProperty = void 0;
const schemaCollection_1 = require("./schemaCollection");
const SchemaProperty = (options) => {
    return (target, { name, addInitializer }) => {
        addInitializer(function () {
            const schemaName = this.constructor.name;
            if (!schemaCollection_1.SchemaCollection.getInstance().has(schemaName)) {
                schemaCollection_1.SchemaCollection.getInstance().add(schemaName, name.toString(), options);
            }
        });
    };
};
exports.SchemaProperty = SchemaProperty;
//# sourceMappingURL=schemaProperty.js.map