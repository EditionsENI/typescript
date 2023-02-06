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
var _a, _ControllerFactory_instance, _ControllerFactory_controllers, _ControllerFactory_instances;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerFactory = void 0;
class ControllerFactory {
    constructor() {
        _ControllerFactory_controllers.set(this, new Map());
        _ControllerFactory_instances.set(this, new Map());
    }
    static getInstance() {
        if (!__classPrivateFieldGet(this, _a, "f", _ControllerFactory_instance)) {
            __classPrivateFieldSet(this, _a, new ControllerFactory(), "f", _ControllerFactory_instance);
        }
        return __classPrivateFieldGet(this, _a, "f", _ControllerFactory_instance);
    }
    initialize() {
        for (const [key, controller] of __classPrivateFieldGet(this, _ControllerFactory_controllers, "f")) {
            __classPrivateFieldGet(this, _ControllerFactory_instances, "f").set(key, new controller());
        }
    }
    register(ctor) {
        __classPrivateFieldGet(this, _ControllerFactory_controllers, "f").set(ctor.name, ctor);
    }
    get(controllerName) {
        const instance = __classPrivateFieldGet(this, _ControllerFactory_instances, "f").get(controllerName);
        if (!instance) {
            throw new Error(`Unknown controller: ${controllerName}`);
        }
        return instance;
    }
}
exports.ControllerFactory = ControllerFactory;
_a = ControllerFactory, _ControllerFactory_controllers = new WeakMap(), _ControllerFactory_instances = new WeakMap();
_ControllerFactory_instance = { value: void 0 };
