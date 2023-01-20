import { HttpVerb, routeCollection } from "../infrastructure/routeCollection";

const action = (httpVerb: HttpVerb, path?: string) => {
  const decorator: MethodDecorator = (
    target: any,
    key: string | Symbol,
    descriptor: PropertyDescriptor
  ) => {
    routeCollection.registerAction(
      target.constructor.name,
      key.toString(),
      httpVerb,
      path
    );    
  };
  return decorator;  
};


const Get = (path?: string) => {
  return action("get", path);
};

const Post = (path?: string) => {
  return action("post", path);
};

const Patch = (path?: string) => {
  return action("patch", path);
};


export { Get, Post, Patch  };
