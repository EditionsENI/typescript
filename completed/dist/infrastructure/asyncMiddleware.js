"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncMiddleware = (handler) => {
    return (request, response, next) => {
        Promise.resolve(handler(request, response, next)).catch(next);
    };
};
exports.asyncMiddleware = asyncMiddleware;
