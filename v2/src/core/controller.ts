import { ControllerFactory } from "./controllerFactory";
import { IController } from "./types";

const Controller = () => {
  return (target: new (...args: unknown[]) => IController, context: ClassDecoratorContext) => {
    console.log('Controller');
    ControllerFactory.getInstance().register(target);
  };
};

export { Controller };