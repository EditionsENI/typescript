"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeCollection_1 = require("../infrastructure/routeCollection");
const Controller = (prefix) => {
    const decorator = (target) => {
        routeCollection_1.routeCollection.registerController(target, !prefix
            ? target.name.replace("Controller", "").toLowerCase()
            : prefix);
    };
    return decorator;
};
exports.Controller = Controller;
