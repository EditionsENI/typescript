"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const controllerFactory_1 = require("./controllerFactory");
const Controller = (target, context) => {
    controllerFactory_1.ControllerFactory.getInstance().register(target);
};
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map