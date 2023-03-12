import fastify, { FastifyInstance } from "fastify";
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { join } from "path";
import { readdir } from "fs/promises";
import { RouteCollection } from "./mvc/routeCollection";
import { ControllerFactory } from "./mvc/controllerFactory";
import { SchemaCollection } from "./schema/schemaCollection";
import { ModelBindings } from "./mvc/modelBindings";

interface ServerOptions {
  title: string;
  description: string;
  version: `${number}.${number}.${number}`;
}

export class Server {
  #fastifyInstance: FastifyInstance;

  constructor() {
    this.#fastifyInstance = fastify();
  }

  async start() {
    await this.#setupOpenApi();
    await this.#initializeControllers();
    this.#setupRouter();

    await this.#fastifyInstance.ready();
    this.#fastifyInstance.swagger();

    try {
      await  this.#fastifyInstance.listen({ port: 3000 });
    } catch (err) {
      this.#fastifyInstance.log.error(err);
      process.exit(1);
    }
  }

  async #initializeControllers() {
    const controllersPath = join(__dirname, '..', 'controllers');
    const files = await readdir(controllersPath, { withFileTypes: true });

    const importFiles = files.filter((file) => file.name.endsWith('.js')).map(
      (fileName) => import(join(controllersPath, fileName.name))
    );
  
    await Promise.all(importFiles);
  }

  async #setupOpenApi() {
    await this.#fastifyInstance.register(fastifySwagger);
    await this.#fastifyInstance.register(fastifySwaggerUI, {
      routePrefix: '/documentation'
    });
  }

  #setupRouter() {
    for (const route of RouteCollection.getInstance().routes) {
      const controller = ControllerFactory.getInstance().get(route.controller);
      const schemaName = ModelBindings.getInstance().get(route.controller, route.action);
      const schema = schemaName ? SchemaCollection.getInstance().getSchema(schemaName) : undefined;

      const method = (controller as any)[route.action];

      this.#fastifyInstance[route.httpVerb](route.path, {
        schema
      }, async (req, res) => {
        const result = await method.call(controller, req);
        res.send(result);
      });
    }
  }
}