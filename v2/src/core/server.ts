import fastify, { FastifyInstance } from "fastify";
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { RouteCollection } from "./mvc/routeCollection";
import { ControllerFactory } from "./mvc/controllerFactory";
import { SchemaCollection } from "./schema/schemaCollection";

interface ServerOptions {
  title: string;
  description: string;
  version: `${number}.${number}.${number}`;
}

export class Server {
  #fastifyInstance: FastifyInstance;
  #options: ServerOptions;

  constructor(options: ServerOptions) {
    this.#fastifyInstance = fastify();
    this.#options = options;
  }

  async initialize() {
    await this.#setupOpenApi();
    ControllerFactory.getInstance().initialize();
    this.#setupRouter();

    await this.#fastifyInstance.ready();
    this.#fastifyInstance.swagger();
  }

  async #setupOpenApi() {
    await this.#fastifyInstance.register(fastifySwagger, {
      openapi: {
        info: {
          title: this.#options.title,
          description: this.#options.description ,
          version: this.#options.version,
        },
      }
    })
    await this.#fastifyInstance.register(fastifySwaggerUI, {
      routePrefix: '/documentation'
    })
  }

  #setupRouter() {
    for (const route of RouteCollection.getInstance().routes) {
      const controller = ControllerFactory.getInstance().get(route.controller);

      const method: Function = (controller as any)[route.method];

      if (typeof method !== 'function') {
        throw new Error(`Action is not a function`);
      }

      const schema = SchemaCollection.getInstance().getByAction(route.controller, route.method);

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