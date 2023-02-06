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
exports.EmployeeController = void 0;
const controller_1 = require("../core/mvc/controller");
const action_1 = require("../core/mvc/action");
const model_1 = require("../core/mvc/model");
const inject_1 = require("../core/ioc/inject");
const createEmployeeModel_1 = require("../models/createEmployeeModel");
const changeSalaryModel_1 = require("../models/changeSalaryModel");
const searchEmployeeModel_1 = require("../models/searchEmployeeModel");
const getEmployeeByIdModel_1 = require("../models/getEmployeeByIdModel");
const repository_1 = require("../core/data/repository");
exports.EmployeeController = (() => {
    var _repository;
    let _classDecorators = [(0, controller_1.Controller)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _private_repository_decorators;
    let _private_repository_initializers = [];
    let _getAll_decorators;
    let _get_decorators;
    let _search_decorators;
    let _post_decorators;
    let _changeSalary_decorators;
    var EmployeeController = _classThis = class {
        constructor() {
            _repository.set(this, (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _private_repository_initializers, void 0)));
            __classPrivateFieldSet(this, _repository, new repository_1.Repository(), "f");
        }
        async getAll() {
            return __classPrivateFieldGet(this, _repository, "f").retreiveAll();
        }
        async get(model) {
            return __classPrivateFieldGet(this, _repository, "f").retreiveById(model.id);
        }
        async search(model) {
            console.table(model);
            return __classPrivateFieldGet(this, _repository, "f").retreiveBy({
                email: model.email
            });
        }
        async post(model) {
            return __classPrivateFieldGet(this, _repository, "f").create(model);
        }
        async changeSalary(model) {
            const employee = await __classPrivateFieldGet(this, _repository, "f").retreiveById(model.employeeId);
            employee.salary = model.salary;
            return __classPrivateFieldGet(this, _repository, "f").update(employee);
        }
    };
    _repository = new WeakMap();
    __setFunctionName(_classThis, "EmployeeController");
    (() => {
        _private_repository_decorators = [(0, inject_1.Inject)()];
        _getAll_decorators = [(0, action_1.Get)()];
        _get_decorators = [(0, action_1.Get)(':id'), (0, model_1.Model)(getEmployeeByIdModel_1.GetEmployeeByIdModel)];
        _search_decorators = [(0, action_1.Get)('search'), (0, model_1.Model)(searchEmployeeModel_1.SearchEmployeeModel)];
        _post_decorators = [(0, action_1.Post)(), (0, model_1.Model)(createEmployeeModel_1.CreateEmployeeModel)];
        _changeSalary_decorators = [(0, model_1.Model)(changeSalaryModel_1.ChangeSalaryModel), (0, action_1.Patch)(":employeeId")];
        __esDecorate(_classThis, null, _getAll_decorators, { kind: "method", name: "getAll", static: false, private: false }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_decorators, { kind: "method", name: "get", static: false, private: false }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _search_decorators, { kind: "method", name: "search", static: false, private: false }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _post_decorators, { kind: "method", name: "post", static: false, private: false }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _changeSalary_decorators, { kind: "method", name: "changeSalary", static: false, private: false }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _private_repository_decorators, { kind: "field", name: "#repository", static: false, private: true }, _private_repository_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        EmployeeController = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EmployeeController = _classThis;
})();
