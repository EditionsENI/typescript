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


export const Get = (path?: string) => {
  return action("get", path);
};

export const Post = (path?: string) => {
  return action("post", path);
};

export const Patch = (path?: string) => {
  return action("patch", path);
};
