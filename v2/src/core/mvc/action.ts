import { HttpVerb, IController } from "./types";
import { RouteCollection } from "./routeCollection";

const action = <
  TController extends IController, 
  TArguments extends any[], 
  TReturn
>(httpVerb: HttpVerb, path?: string) => {
  return (
    target: (this: TController, ...args: TArguments) => TReturn,
    { name, addInitializer }: ClassMethodDecoratorContext<TController>
  ) => {
    addInitializer(function (this) {
      RouteCollection.getInstance().add({
        controller: this.constructor.name,
        method: name.toString()},
        httpVerb,
        path || "");
    });
  };
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

export { Get, Post, Patch };
