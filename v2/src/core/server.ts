import fastify, { FastifyInstance } from "fastify";
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { ControllerFactory } from "./controllerFactory";
import { RouteCollection } from "./routeCollection";
import { SchemaCollection } from "./schemaCollection";

export class Server {
  readonly #factory: ControllerFactory;
  readonly #routeCollection: RouteCollection;
  readonly #schemaCollection: SchemaCollection;
  readonly #fastifyInstance: FastifyInstance;
  #port?: number;
  #title?: string;
  #description?: string;
  #version?: `${number}.${number}.${number}`;

  constructor(routeCollection: RouteCollection, schemaCollection: SchemaCollection, factory: ControllerFactory) {
    this.#routeCollection = routeCollection;
    this.#schemaCollection = schemaCollection;
    this.#factory = factory;
    this.#fastifyInstance = fastify();
  }

  async initialize() {
    this.#loadConfiguration();
    await this.#setupOpenApi();
    this.#setupRouter();
    await this.#fastifyInstance.ready();
    this.#fastifyInstance.swagger();
  }

  setInfo(title: string, description: string, version: `${number}.${number}.${number}`) {
    this.#description = description;
    this.#title = title;
    this.#version = version;
  }

  async #setupOpenApi() {
    await this.#fastifyInstance.register(fastifySwagger, {
      openapi: {
        info: {
          title: this.#title || '',
          description: this.#description || '',
          version: this.#version || '0.0.0'
        },
      }
    })
    await this.#fastifyInstance.register(fastifySwaggerUI, {
      routePrefix: '/documentation'
    })
  }

  #loadConfiguration() {
    this.#port = 3000;
  }

  #setupRouter() {
    for (const route of this.#routeCollection.routes) {
      const controller = this.#factory.get(route.controller);

      const method: Function = (controller as any)[route.method];

      if (typeof method !== 'function') {
        throw new Error(`Action is not a function`);
      }

      const schema = this.#schemaCollection.getByAction(route.controller, route.method);

      this.#fastifyInstance[route.httpVerb](route.path, {
        schema
      }, async (req, res) => {
        const result = await method.bind(controller)(req);
        res.send(result);
      });
    }
  }

  listen() {
    this.#fastifyInstance.listen({ port: this.#port }, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      console.log(`Server listening at ${address}`);
    });
  }
}