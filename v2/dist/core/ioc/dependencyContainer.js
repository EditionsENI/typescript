"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyContainer = void 0;
class DependencyContainer {
    static #instance;
    #dependencies;
    constructor() {
        this.#dependencies = new Map();
    }
    static getInstance() {
        if (!this.#instance) {
            this.#instance = new DependencyContainer();
        }
        return this.#instance;
    }
    register(dependencyKey, ctor) {
        this.#dependencies.set(dependencyKey, ctor);
    }
    get(dependencyKey) {
        const ctor = this.#dependencies.get(dependencyKey);
        if (!ctor) {
            throw new Error(`Unknown dependency: ${dependencyKey.toString()}`);
        }
        return new ctor();
    }
}
exports.DependencyContainer = DependencyContainer;
//# sourceMappingURL=dependencyContainer.js.map