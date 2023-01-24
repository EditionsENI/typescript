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
var _a, _Routes_instance, _Routes_routes;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
class Routes {
    get routes() {
        return __classPrivateFieldGet(this, _Routes_routes, "f");
    }
    constructor() {
        _Routes_routes.set(this, void 0);
        __classPrivateFieldSet(this, _Routes_routes, [], "f");
    }
    static getInstance() {
        if (!__classPrivateFieldGet(this, _a, "f", _Routes_instance)) {
            __classPrivateFieldSet(this, _a, new Routes(), "f", _Routes_instance);
        }
        return __classPrivateFieldGet(this, _a, "f", _Routes_instance);
    }
    add(route) {
        const r = Object.assign(Object.assign({}, route), { path: `/${route.controller.replace('Controller', '').toLowerCase()}/${route.path}` });
        console.log('Add route');
        console.table(r);
        __classPrivateFieldGet(this, _Routes_routes, "f").push(route);
    }
}
exports.Routes = Routes;
_a = Routes, _Routes_routes = new WeakMap();
_Routes_instance = { value: void 0 };
