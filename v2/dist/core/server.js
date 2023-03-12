"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const fastify_1 = __importDefault(require("fastify"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const routeCollection_1 = require("./mvc/routeCollection");
const controllerFactory_1 = require("./mvc/controllerFactory");
const schemaCollection_1 = require("./schema/schemaCollection");
const modelBindings_1 = require("./mvc/modelBindings");
const dependencyContainer_1 = require("./ioc/dependencyContainer");
const repository_1 = require("./data/repository");
const fileStorage_1 = require("./data/fileStorage");
class Server {
    #fastifyInstance;
    #options;
    constructor(options) {
        this.#fastifyInstance = (0, fastify_1.default)();
        this.#options = options;
    }
    async initialize() {
        await this.#setupOpenApi();
        this.initializeDependencies();
        await this.initializeControllers();
        this.#setupRouter();
        await this.#fastifyInstance.ready();
        this.#fastifyInstance.swagger();
    }
    initializeDependencies() {
        dependencyContainer_1.DependencyContainer.getInstance().register('repository', repository_1.Repository);
        dependencyContainer_1.DependencyContainer.getInstance().register('storage', fileStorage_1.FileStorage);
    }
    async initializeControllers() {
        await Promise.resolve().then(() => __importStar(require('../controllers/employeeController')));
    }
    async #setupOpenApi() {
        await this.#fastifyInstance.register(swagger_1.default, {
            openapi: {
                info: {
                    title: this.#options.title,
                    description: this.#options.description,
                    version: this.#options.version,
                },
            }
        });
        await this.#fastifyInstance.register(swagger_ui_1.default, {
            routePrefix: '/documentation'
        });
    }
    #setupRouter() {
        for (const route of routeCollection_1.RouteCollection.getInstance().routes) {
            const controller = controllerFactory_1.ControllerFactory.getInstance().get(route.controller);
            const method = controller[route.action];
            if (typeof method !== 'function') {
                throw new Error(`Action is not a function`);
            }
            const schemaName = modelBindings_1.ModelBindings.getInstance().get(route.controller, route.action);
            const schema = schemaName ? schemaCollection_1.SchemaCollection.getInstance().getJsonSchema(schemaName) : undefined;
            this.#fastifyInstance[route.httpVerb](route.path, {
                schema
            }, async (req, res) => {
                const result = await method.bind(controller)(req);
                res.send(result);
            });
        }
    }
    listen() {
        this.#fastifyInstance.listen({ port: 3000 }, (err, address) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            console.log(`Server listening at ${address}`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map