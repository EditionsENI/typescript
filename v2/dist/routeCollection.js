"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeCollection = void 0;
class RouteCollection {
    constructor() {
        this.controllerInformations = [];
        this.actionInformations = [];
    }
    registerController(ctor, prefix) {
        this.controllerInformations.push({
            controllerName: ctor.name,
            ctor,
            prefix
        });
    }
    registerAction(controllerName, methodName, httpVerb, path) {
        this.actionInformations.push({
            controllerName,
            methodName,
            httpVerb,
            path: path || ""
        });
    }
    setupRouter() {
        console.table(this.registerController);
        console.table(this.registerAction);
    }
}
const routeCollection = new RouteCollection();
exports.routeCollection = routeCollection;
