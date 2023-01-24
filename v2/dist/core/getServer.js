"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServer = void 0;
const fastify_1 = __importDefault(require("fastify"));
const getServer = (routes, factory) => {
    const server = (0, fastify_1.default)();
    for (const route of routes) {
        const controller = factory.get(route.controller);
        const method = controller[route.method];
        if (typeof method !== 'function') {
            throw new Error(`Action is not a function`);
        }
        server[route.httpVerb](route.path, method.bind(controller));
    }
    return server;
};
exports.getServer = getServer;
