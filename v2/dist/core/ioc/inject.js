"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inject = void 0;
const dependencyContainer_1 = require("./dependencyContainer");
const Inject = (target, { name, private: isPrivate }) => {
    return function () {
        const dependencyKey = name.toString();
        return dependencyContainer_1.DependencyContainer.getInstance().get(isPrivate ? dependencyKey.replace('#', '') : dependencyKey);
    };
};
exports.Inject = Inject;
//# sourceMappingURL=inject.js.map