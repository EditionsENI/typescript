"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inject = void 0;
const dependencyCollection_1 = require("./dependencyCollection");
const Inject = (key) => {
    return (target, { name }) => {
        return function (value) {
            console.log(key !== null && key !== void 0 ? key : name.toString().replace('#', '').toUpperCase());
            console.log(value);
            return dependencyCollection_1.DependencyCollection.getInstance().get(key !== null && key !== void 0 ? key : name.toString().replace('#', '').toUpperCase());
        };
    };
};
exports.Inject = Inject;
