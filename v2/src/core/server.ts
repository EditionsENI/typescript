import fastify, { FastifyInstance } from "fastify";
import { ControllerFactory } from "./controllerFactory";
import { RouteCollection } from "./routeCollection";
import { IRoute } from "./types";

export class Server {
    readonly #factory: ControllerFactory;
    readonly #routes: ReadonlyArray<IRoute>;
    readonly #fastifyInstance: FastifyInstance;
    #port?: number;
    
    constructor(routeCollection: RouteCollection, factory: ControllerFactory) {
        this.#routes = routeCollection.routes;
        this.#factory = factory;
        this.#fastifyInstance = fastify();
    }

    initialize() {
        this.#loadConfiguration();
        this.#setupRouter();
        //this.setupSwagger();
        //this.setupMiddleware();
    }

    #loadConfiguration() {
        this.#port = 3000;
    }

    #setupRouter() {
        for(const route of this.#routes) {
            const controller = this.#factory.get(route.controller);
            
            const method = (controller as any)[route.method];
    
            if(typeof method !== 'function') {
                throw new Error(`Action is not a function`);
            }
    
            this.#fastifyInstance[route.httpVerb](route.path, method.bind(controller));
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