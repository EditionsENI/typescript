import { FastifyRequest } from "fastify";
import { ModelBindings } from "./modelBindings";

export const Model = <
  TController extends Object, 
  TArguments,
  TReturn
>(modelClass: new () => TArguments) => {
  return (
    target: (this: TController, arg: TArguments) => TReturn,
    { name, addInitializer } : ClassMethodDecoratorContext<TController>
  ) => {
    addInitializer(function () {
      new modelClass();
      ModelBindings.getInstance().bind(this.constructor.name, name.toString(), modelClass.name);

      const executeWithModel = (req: FastifyRequest) => {

        const model: TArguments = {
          ...(req.body as any),
          ...(req.query as any),
          ...(req.params as any)
        };

        return target.call(this, model);
      }

      (this as any)[name] = executeWithModel.bind(this);
    })
  };
};
