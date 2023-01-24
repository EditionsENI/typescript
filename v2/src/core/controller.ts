import { ControllerFactory } from "./controllerFactory";
import { IController } from "./types";

const Controller = () => {
  return (target: new (...args:[]) => IController, context: ClassDecoratorContext) => {
    ControllerFactory.getInstance().register(target);
  };
};

export { Controller };