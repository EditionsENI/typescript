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
      // Let's keep the original method to call it later.

      const originalMethod = (this as any)[name];

      // We need a new method to bind the request data to the model

      // Now we gonna define a new method to execute
      const validateModel = () => {
        // Create a new instance of the model
        
        return originalMethod();
      }

      // Replace the method on the instance
      (this as any)[name] = validateModel.bind(this);
    })
  };
};
