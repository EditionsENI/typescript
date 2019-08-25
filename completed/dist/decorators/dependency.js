"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependencyService_1 = require("../infrastructure/dependencyService");
const Dependency = (key) => {
    const decorator = (target) => {
        dependencyService_1.dependencyService.add(key, target);
    };
    return decorator;
};
exports.Dependency = Dependency;
