"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const Controller = (prefix) => {
    return (target, context) => {
        console.log(target);
        console.log(context.name);
    };
};
exports.Controller = Controller;
