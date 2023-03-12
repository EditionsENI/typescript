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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
const controller_1 = require("../core/mvc/controller");
const action_1 = require("../core/mvc/action");
const model_1 = require("../core/mvc/model");
const inject_1 = require("../core/ioc/inject");
const createEmployeeModel_1 = require("../models/createEmployeeModel");
const repository_1 = require("../core/data/repository");
exports.EmployeeController = (() => {
    let _classDecorators = [controller_1.Controller];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _private_repository_decorators;
    let _private_repository_initializers = [];
    let _getAll_decorators;
    let _post_decorators;
    var EmployeeController = class {
        static {
            _private_repository_decorators = [inject_1.Inject];
            _getAll_decorators = [action_1.Get];
            _post_decorators = [action_1.Post, (0, model_1.Model)(createEmployeeModel_1.CreateEmployeeModel)];
            __esDecorate(this, null, _getAll_decorators, { kind: "method", name: "getAll", static: false, private: false, access: { has: obj => "getAll" in obj, get: obj => obj.getAll } }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _post_decorators, { kind: "method", name: "post", static: false, private: false, access: { has: obj => "post" in obj, get: obj => obj.post } }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _private_repository_decorators, { kind: "field", name: "#repository", static: false, private: true, access: { has: obj => #repository in obj, get: obj => obj.#repository, set: (obj, value) => { obj.#repository = value; } } }, _private_repository_initializers, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name }, null, _classExtraInitializers);
            EmployeeController = _classThis = _classDescriptor.value;
            __runInitializers(_classThis, _classExtraInitializers);
        }
        #repository = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _private_repository_initializers, void 0));
        constructor() {
            this.#repository = new repository_1.Repository();
        }
        async getAll() {
            return this.#repository.retreiveAll();
        }
        async post(model) {
            return this.#repository.create(model);
        }
    };
    return EmployeeController = _classThis;
})();
//# sourceMappingURL=employeeController.js.map