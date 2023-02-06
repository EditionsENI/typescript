"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.push(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.push(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorage = void 0;
const promises_1 = require("fs/promises");
const path_1 = require("path");
const memoryStorage_1 = require("./memoryStorage");
const injectable_1 = require("../ioc/injectable");
exports.FileStorage = (() => {
    var _instances, _loaded, _jsonPath, _exists, _load;
    let _classDecorators = [(0, injectable_1.Injectable)('FILE_STORAGE')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FileStorage = _classThis = class extends memoryStorage_1.MemoryStorage {
        constructor() {
            super();
            _instances.add(this);
            _loaded.set(this, void 0);
            _jsonPath.set(this, void 0);
            __classPrivateFieldSet(this, _loaded, false, "f");
            __classPrivateFieldSet(this, _jsonPath, (0, path_1.join)(__dirname, 'db.json'), "f");
        }
        async getEntities() {
            await __classPrivateFieldGet(this, _instances, "m", _load).call(this);
            return super.getEntities();
        }
        async save(entity) {
            await __classPrivateFieldGet(this, _instances, "m", _load).call(this);
            super.save(entity);
            await (0, promises_1.writeFile)(__classPrivateFieldGet(this, _jsonPath, "f"), JSON.stringify(this.entities), 'utf-8');
        }
    };
    _loaded = new WeakMap();
    _jsonPath = new WeakMap();
    _instances = new WeakSet();
    _exists = async function _exists() {
        try {
            await (0, promises_1.access)(__classPrivateFieldGet(this, _jsonPath, "f"));
            return Promise.resolve(true);
        }
        catch (_a) {
            return Promise.resolve(false);
        }
    };
    _load = async function _load() {
        if (!__classPrivateFieldGet(this, _loaded, "f")) {
            const fileExists = await __classPrivateFieldGet(this, _instances, "m", _exists).call(this);
            if (!fileExists) {
                await (0, promises_1.writeFile)(__classPrivateFieldGet(this, _jsonPath, "f"), JSON.stringify([]), 'utf-8');
            }
            const json = await (0, promises_1.readFile)(__classPrivateFieldGet(this, _jsonPath, "f"), 'utf-8');
            this.entities = JSON.parse(json);
        }
    };
    __setFunctionName(_classThis, "FileStorage");
    (() => {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        FileStorage = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FileStorage = _classThis;
})();
