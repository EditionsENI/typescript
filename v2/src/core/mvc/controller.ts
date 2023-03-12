import { ControllerFactory } from "./controllerFactory";

export const Controller = <TConstructor extends new (...args: unknown[]) => unknown>(target: TConstructor, context: ClassDecoratorContext<TConstructor>) => {
  ControllerFactory.getInstance().register(target);
};
