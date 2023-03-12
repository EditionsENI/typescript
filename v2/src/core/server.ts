import fastify, { FastifyInstance } from "fastify";
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { RouteCollection } from "./mvc/routeCollection";
import { ControllerFactory } from "./mvc/controllerFactory";
import { SchemaCollection } from "./schema/schemaCollection";
import { ModelBindings } from "./mvc/modelBindings";
import { DependencyContainer } from "./ioc/dependencyContainer";
import { Repository } from "./data/repository";
import { FileStorage } from "./data/fileStorage";

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
    this.initializeDependencies();
    await this.initializeControllers();
    this.#setupRouter();

    await this.#fastifyInstance.ready();
    this.#fastifyInstance.swagger();
  }

  initializeDependencies() {
    DependencyContainer.getInstance().register('repository', Repository);
    DependencyContainer.getInstance().register('storage', FileStorage);
  }

  async initializeControllers() {
    await import('../controllers/employeeController');
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

      const method: Function = (controller as any)[route.action];

      if (typeof method !== 'function') {
        throw new Error(`Action is not a function`);
      }

      const schemaName = ModelBindings.getInstance().get(route.controller, route.action);
      const schema = schemaName ? SchemaCollection.getInstance().getJsonSchema(schemaName) : undefined;

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