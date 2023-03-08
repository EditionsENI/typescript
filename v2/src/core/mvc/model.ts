import { FastifyRequest } from "fastify";
import { ModelBindings } from "./modelBindings";

export const Model = <
  TController, 
  TArguments extends any[],
  TReturn
>(modelClass: new () => unknown) => {
  return (
    target: (this: TController, ...args: TArguments) => TReturn,
    { name, addInitializer } : ClassMethodDecoratorContext<TController>
  ) => {
    addInitializer(function (this) {
      new modelClass();
      ModelBindings.getInstance().bind((this as any).constructor.name, name.toString(), modelClass.name);

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
