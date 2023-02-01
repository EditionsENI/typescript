import fastify, { FastifyInstance } from "fastify";
import { ControllerFactory } from "./controllerFactory";
import { RouteCollection } from "./routeCollection";
import { SchemaCollection } from "./schemaCollection";

export class Server {
    readonly #factory: ControllerFactory;
    readonly #routeCollection: RouteCollection;
    readonly #schemaCollection: SchemaCollection;
    readonly #fastifyInstance: FastifyInstance;
    #port?: number;
    
    constructor(routeCollection: RouteCollection, schemaCollection: SchemaCollection, factory: ControllerFactory) {
        this.#routeCollection = routeCollection;
        this.#schemaCollection = schemaCollection;
        this.#factory = factory;
        this.#fastifyInstance = fastify();
    }

    initialize() {
        this.#loadConfiguration();
        this.#setupRouter();
    }

    #loadConfiguration() {
        this.#port = 3000;
    }

    #setupRouter() {
        console.table(this.#schemaCollection.schemas);
        console.table(this.#schemaCollection.actionBindings);
        for(const route of this.#routeCollection.routes) {
            console.log(`Creating routes for controller: ${route.controller}`);
            const controller = this.#factory.get(route.controller);
            

            console.log(`Creating route for method: ${route.method}`);
            const method = (controller as any)[route.method];
    
            if(typeof method !== 'function') {
                throw new Error(`Action is not a function`);
            }

            const schema = this.#schemaCollection.getByAction(route.controller, route.method);

            console.log(`Schema for action :${route.method}`);
            console.log(JSON.stringify(schema));
    
            this.#fastifyInstance[route.httpVerb](route.path, {
                schema
            }, method.bind(controller));
        }
    }

    listen() {
        this.#fastifyInstance.listen({ port: this.#port }, (err, address) => {
            if(err) {
                console.error(err);
                process.exit(1);
            }
        
            console.log(`Server listening at ${address}`);
        });
    }
}