"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const modelBindings_1 = require("./modelBindings");
const Model = (modelClass) => {
    return (target, { name, addInitializer }) => {
        addInitializer(function () {
            new modelClass();
            modelBindings_1.ModelBindings.getInstance().bind(this.constructor.name, name.toString(), modelClass.name);
            const executeWithModel = (req) => {
                const model = {
                    ...req.body,
                    ...req.query,
                    ...req.params
                };
                return target.call(this, model);
            };
            this[name] = executeWithModel.bind(this);
        });
    };
};
exports.Model = Model;
//# sourceMappingURL=model.js.map