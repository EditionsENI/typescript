"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteCollection = void 0;
class RouteCollection {
    static #instance;
    #routes;
    get routes() {
        return this.#routes;
    }
    constructor() {
        this.#routes = [];
    }
    static getInstance() {
        if (!this.#instance) {
            this.#instance = new RouteCollection();
        }
        return this.#instance;
    }
    add(route) {
        this.#routes.push({
            ...route,
            path: `/${route.controller.replace('Controller', '').toLowerCase()}`
        });
    }
}
exports.RouteCollection = RouteCollection;
//# sourceMappingURL=routeCollection.js.map