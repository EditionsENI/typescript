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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
const action_1 = require("../core/action");
const controller_1 = require("../core/controller");
exports.EmployeeController = (() => {
    let _classDecorators = [(0, controller_1.Controller)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getAll_decorators;
    let _get_decorators;
    let _post_decorators;
    let _changeTeam_decorators;
    var EmployeeController = _classThis = class {
        getAll() {
            throw new Error("Method not implemented.");
        }
        get(id) {
            throw new Error("Method not implemented.");
        }
        post(model) {
            throw new Error("Method not implemented.");
        }
        changeTeam() {
            throw new Error("Method not implemented.");
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
    __setFunctionName(_classThis, "EmployeeController");
    (() => {
        _getAll_decorators = [(0, action_1.Get)()];
        _get_decorators = [(0, action_1.Get)(':employeeId')];
        _post_decorators = [(0, action_1.Post)()];
        _changeTeam_decorators = [(0, action_1.Patch)(":employeeId/team/:teamId")];
        __esDecorate(_classThis, null, _getAll_decorators, { kind: "method", name: "getAll", static: false, private: false }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_decorators, { kind: "method", name: "get", static: false, private: false }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _post_decorators, { kind: "method", name: "post", static: false, private: false }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _changeTeam_decorators, { kind: "method", name: "changeTeam", static: false, private: false }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        EmployeeController = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EmployeeController = _classThis;
})();
