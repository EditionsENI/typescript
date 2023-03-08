import { ControllerFactory } from "./controllerFactory";

export const Controller = () => {
  return (target: new (...args: unknown[]) => unknown, context: ClassDecoratorContext) => {
    ControllerFactory.getInstance().register(target);
  };
};
