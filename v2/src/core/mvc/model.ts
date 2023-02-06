import { FastifyRequest } from "fastify";
import { IController } from "./types";
import { SchemaCollection } from "../schema/schemaCollection";

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
        const model = {
          ...(req.body as any),
          ...(req.query as any),
          ...(req.params as any)
        };

        return originalMethod.bind(this)(model);
      }

      (this as any)[name] = executeWithModel.bind(this);
    })
  };
};
