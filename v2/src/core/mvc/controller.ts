import { ControllerFactory } from "./controllerFactory";
import { IController } from "./types";

export const Controller = () => {
  return (target: new (...args: unknown[]) => IController, context: ClassDecoratorContext) => {
    ControllerFactory.getInstance().register(target);
  };
};
