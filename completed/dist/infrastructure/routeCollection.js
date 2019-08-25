"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncMiddleware_1 = require("./asyncMiddleware");
const inject_1 = require("../decorators/inject");
const dependencyService_1 = require("./dependencyService");
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
    setupRouter(router) {
        this.controllerInformations.forEach(c => {
            const injections = Reflect.getOwnMetadata(inject_1.INJECTIONS_METADATA_KEY, c.ctor);
            const dependencies = [];
            Object
                .keys(injections)
                .map(k => parseInt(k, 10))
                .sort((a, b) => (a < b ? -1 : 1))
                .forEach((key) => {
                dependencies.push(dependencyService_1.dependencyService.resolve(injections[key]));
            });
            const controller = new c.ctor(...dependencies);
            const actions = this.actionInformations.filter(a => a.controllerName === c.controllerName);
            actions.forEach(a => {
                const action = controller[a.methodName].bind(controller);
                const route = `/${c.prefix}/${a.path}`;
                router[a.httpVerb](route, asyncMiddleware_1.asyncMiddleware(action));
            });
        });
    }
}
const routeCollection = new RouteCollection();
exports.routeCollection = routeCollection;
