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
var _Server_instances, _Server_fastifyInstance, _Server_options, _Server_setupOpenApi, _Server_setupRouter;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const fastify_1 = __importDefault(require("fastify"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const routeCollection_1 = require("./mvc/routeCollection");
const controllerFactory_1 = require("./mvc/controllerFactory");
const schemaCollection_1 = require("./schema/schemaCollection");
class Server {
    constructor(options) {
        _Server_instances.add(this);
        _Server_fastifyInstance.set(this, void 0);
        _Server_options.set(this, void 0);
        __classPrivateFieldSet(this, _Server_fastifyInstance, (0, fastify_1.default)(), "f");
        __classPrivateFieldSet(this, _Server_options, options, "f");
    }
    async initialize() {
        await __classPrivateFieldGet(this, _Server_instances, "m", _Server_setupOpenApi).call(this);
        controllerFactory_1.ControllerFactory.getInstance().initialize();
        __classPrivateFieldGet(this, _Server_instances, "m", _Server_setupRouter).call(this);
        await __classPrivateFieldGet(this, _Server_fastifyInstance, "f").ready();
        __classPrivateFieldGet(this, _Server_fastifyInstance, "f").swagger();
    }
    listen() {
        __classPrivateFieldGet(this, _Server_fastifyInstance, "f").listen({ port: 3000 }, (err, address) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            console.log(`Server listening at ${address}`);
        });
    }
}
exports.Server = Server;
_Server_fastifyInstance = new WeakMap(), _Server_options = new WeakMap(), _Server_instances = new WeakSet(), _Server_setupOpenApi = async function _Server_setupOpenApi() {
    await __classPrivateFieldGet(this, _Server_fastifyInstance, "f").register(swagger_1.default, {
        openapi: {
            info: {
                title: __classPrivateFieldGet(this, _Server_options, "f").title,
                description: __classPrivateFieldGet(this, _Server_options, "f").description,
                version: __classPrivateFieldGet(this, _Server_options, "f").version,
            },
        }
    });
    await __classPrivateFieldGet(this, _Server_fastifyInstance, "f").register(swagger_ui_1.default, {
        routePrefix: '/documentation'
    });
}, _Server_setupRouter = function _Server_setupRouter() {
    for (const route of routeCollection_1.RouteCollection.getInstance().routes) {
        const controller = controllerFactory_1.ControllerFactory.getInstance().get(route.controller);
        const method = controller[route.method];
        if (typeof method !== 'function') {
            throw new Error(`Action is not a function`);
        }
        const schema = schemaCollection_1.SchemaCollection.getInstance().getByAction(route.controller, route.method);
        __classPrivateFieldGet(this, _Server_fastifyInstance, "f")[route.httpVerb](route.path, {
            schema
        }, async (req, res) => {
            const result = await method.bind(controller)(req);
            res.send(result);
        });
    }
};
