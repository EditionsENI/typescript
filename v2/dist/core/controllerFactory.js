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
var _a, _ControllerFactory_instance, _ControllerFactory_controllerInstances;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerFactory = void 0;
class ControllerFactory {
    constructor() {
        _ControllerFactory_controllerInstances.set(this, new Map());
    }
    static getInstance() {
        if (!__classPrivateFieldGet(this, _a, "f", _ControllerFactory_instance)) {
            __classPrivateFieldSet(this, _a, new ControllerFactory(), "f", _ControllerFactory_instance);
        }
        return __classPrivateFieldGet(this, _a, "f", _ControllerFactory_instance);
    }
    register(ctor) {
        __classPrivateFieldGet(this, _ControllerFactory_controllerInstances, "f").set(ctor.name, new ctor());
    }
    get(controllerName) {
        const controllerInstance = __classPrivateFieldGet(this, _ControllerFactory_controllerInstances, "f").get(controllerName);
        if (!controllerInstance) {
            throw new Error(`Unknown controller: ${controllerName}`);
        }
        return controllerInstance;
    }
}
exports.ControllerFactory = ControllerFactory;
_a = ControllerFactory, _ControllerFactory_controllerInstances = new WeakMap();
_ControllerFactory_instance = { value: void 0 };
