"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _RouteCollection_instance, _RouteCollection_routes;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteCollection = void 0;
class RouteCollection {
    get routes() {
        return __classPrivateFieldGet(this, _RouteCollection_routes, "f");
    }
    constructor() {
        _RouteCollection_routes.set(this, void 0);
        __classPrivateFieldSet(this, _RouteCollection_routes, [], "f");
    }
    static getInstance() {
        if (!__classPrivateFieldGet(this, _a, "f", _RouteCollection_instance)) {
            __classPrivateFieldSet(this, _a, new RouteCollection(), "f", _RouteCollection_instance);
        }
        return __classPrivateFieldGet(this, _a, "f", _RouteCollection_instance);
    }
    add(action, httpVerb, path) {
        __classPrivateFieldGet(this, _RouteCollection_routes, "f").push(Object.assign(Object.assign({}, action), { httpVerb, path: `/${action.controller.replace('Controller', '').toLowerCase()}/${path}` }));
    }
}
exports.RouteCollection = RouteCollection;
_a = RouteCollection, _RouteCollection_routes = new WeakMap();
_RouteCollection_instance = { value: void 0 };
