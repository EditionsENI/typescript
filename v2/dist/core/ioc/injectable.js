"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injectable = void 0;
const dependencyCollection_1 = require("./dependencyCollection");
const Injectable = (key) => {
    return (target, context) => {
        dependencyCollection_1.DependencyCollection.getInstance().register(key !== null && key !== void 0 ? key : target.name.toUpperCase(), target);
    };
};
exports.Injectable = Injectable;
