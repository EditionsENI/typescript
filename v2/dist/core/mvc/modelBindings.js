"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelBindings = void 0;
class ModelBindings {
    static #instance;
    #bindings;
    constructor() {
        this.#bindings = new Map();
    }
    static getInstance() {
        if (!this.#instance) {
            this.#instance = new ModelBindings();
        }
        return this.#instance;
    }
    bind(controllerName, actionName, modelName) {
        this.#bindings.set(`${controllerName}#${actionName}`, modelName);
    }
    get(controllerName, actionName) {
        return this.#bindings.get(`${controllerName}#${actionName}`);
    }
}
exports.ModelBindings = ModelBindings;
//# sourceMappingURL=modelBindings.js.map