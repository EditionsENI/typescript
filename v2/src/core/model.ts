import { FastifyRequest } from "fastify";
import { SchemaCollection } from "./schemaCollection";
import { IController } from "./types";

export const Model = <
  TController extends IController, 
  TArguments extends any[],
  TReturn
>(ctor: new () => unknown) => {
  return (
    target: (this: TController, ...args: TArguments) => TReturn,
    { name, addInitializer } : ClassMethodDecoratorContext<TController>
  ) => {
    addInitializer(function (this) {
      new ctor();
      SchemaCollection.getInstance().bind(`${this.constructor.name}#${name.toString()}`, ctor.name);

      const originalMethod = (this as any)[name];

      const executeWithModel = (req: FastifyRequest) => {
        // Create a new instance of the model
        const model = {
          ...(req.body as any),
          ...(req.query as any),
          ...(req.params as any)
        };

        return originalMethod(model);
      }

      // Replace the method on the instance
      (this as any)[name] = executeWithModel.bind(this);
    })
  };
};
