import { FastifyRequest } from "fastify";
import { ModelBindings } from "./modelBindings";

export const Model = <
  TController extends Object, 
  TModel extends Object,
  TReturn
>(modelConstructor: new () => TModel) => {
  return (
    target: (this: TController, arg: TModel) => TReturn,
    { name, addInitializer } : ClassMethodDecoratorContext<TController>
  ) => {
    addInitializer(function () {
      new modelConstructor();
      ModelBindings.getInstance().bind(this.constructor.name, name.toString(), modelConstructor.name);

      const executeWithModel = (req: FastifyRequest) => {
        const model = new modelConstructor();

        if(typeof req.body === 'object') {
          Object.assign(model, req.body);
        }

        return target.call(this, model);
      }

      (this as any)[name] = executeWithModel.bind(this);
    })
  };
};
