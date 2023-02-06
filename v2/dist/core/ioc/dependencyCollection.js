"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _DependencyCollection_instance, _DependencyCollection_dependencies;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyCollection = void 0;
class DependencyCollection {
    constructor() {
        _DependencyCollection_dependencies.set(this, void 0);
        __classPrivateFieldSet(this, _DependencyCollection_dependencies, new Map(), "f");
    }
    static getInstance() {
        if (!__classPrivateFieldGet(this, _a, "f", _DependencyCollection_instance)) {
            __classPrivateFieldSet(this, _a, new DependencyCollection(), "f", _DependencyCollection_instance);
        }
        return __classPrivateFieldGet(this, _a, "f", _DependencyCollection_instance);
    }
    register(dependencyKey, ctor) {
        __classPrivateFieldGet(this, _DependencyCollection_dependencies, "f").set(dependencyKey, ctor);
    }
    get(dependencyKey) {
        const ctor = __classPrivateFieldGet(this, _DependencyCollection_dependencies, "f").get(dependencyKey);
        if (!ctor) {
            throw new Error(`Unknown dependency: ${dependencyKey.toString()}`);
        }
        return new ctor();
    }
}
exports.DependencyCollection = DependencyCollection;
_a = DependencyCollection, _DependencyCollection_dependencies = new WeakMap();
_DependencyCollection_instance = { value: void 0 };
