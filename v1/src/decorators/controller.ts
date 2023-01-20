import { routeCollection } from "../infrastructure/routeCollection";

const Controller = (prefix?: string) => {
  const decorator: ClassDecorator = (target: any) => {
    routeCollection.registerController(
      target,
      !prefix 
        ? target.name.replace("Controller", "").toLowerCase() 
        : prefix
    );
  };
  return decorator;  
};

export { Controller };