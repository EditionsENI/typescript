"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Server_instances, _Server_factory, _Server_routeCollection, _Server_schemaCollection, _Server_fastifyInstance, _Server_port, _Server_loadConfiguration, _Server_setupRouter;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const fastify_1 = __importDefault(require("fastify"));
class Server {
    constructor(routeCollection, schemaCollection, factory) {
        _Server_instances.add(this);
        _Server_factory.set(this, void 0);
        _Server_routeCollection.set(this, void 0);
        _Server_schemaCollection.set(this, void 0);
        _Server_fastifyInstance.set(this, void 0);
        _Server_port.set(this, void 0);
        __classPrivateFieldSet(this, _Server_routeCollection, routeCollection, "f");
        __classPrivateFieldSet(this, _Server_schemaCollection, schemaCollection, "f");
        __classPrivateFieldSet(this, _Server_factory, factory, "f");
        __classPrivateFieldSet(this, _Server_fastifyInstance, (0, fastify_1.default)(), "f");
    }
    initialize() {
        __classPrivateFieldGet(this, _Server_instances, "m", _Server_loadConfiguration).call(this);
        __classPrivateFieldGet(this, _Server_instances, "m", _Server_setupRouter).call(this);
    }
    listen() {
        __classPrivateFieldGet(this, _Server_fastifyInstance, "f").listen({ port: __classPrivateFieldGet(this, _Server_port, "f") }, (err, address) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            console.log(`Server listening at ${address}`);
        });
    }
}
exports.Server = Server;
_Server_factory = new WeakMap(), _Server_routeCollection = new WeakMap(), _Server_schemaCollection = new WeakMap(), _Server_fastifyInstance = new WeakMap(), _Server_port = new WeakMap(), _Server_instances = new WeakSet(), _Server_loadConfiguration = function _Server_loadConfiguration() {
    __classPrivateFieldSet(this, _Server_port, 3000, "f");
}, _Server_setupRouter = function _Server_setupRouter() {
    console.table(__classPrivateFieldGet(this, _Server_schemaCollection, "f").schemas);
    console.table(__classPrivateFieldGet(this, _Server_schemaCollection, "f").actionBindings);
    for (const route of __classPrivateFieldGet(this, _Server_routeCollection, "f").routes) {
        console.log(`Creating routes for controller: ${route.controller}`);
        const controller = __classPrivateFieldGet(this, _Server_factory, "f").get(route.controller);
        console.log(`Creating route for method: ${route.method}`);
        const method = controller[route.method];
        if (typeof method !== 'function') {
            throw new Error(`Action is not a function`);
        }
        const schema = __classPrivateFieldGet(this, _Server_schemaCollection, "f").getByAction(route.controller, route.method);
        console.log(`Schema for action :${route.method}`);
        console.log(JSON.stringify(schema));
        __classPrivateFieldGet(this, _Server_fastifyInstance, "f")[route.httpVerb](route.path, {
            schema
        }, method.bind(controller));
    }
};
