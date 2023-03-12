import { HttpVerb } from "./types";
import { RouteCollection } from "./routeCollection";

const action = <
  TController extends Object, 
  TArguments extends any[], 
  TReturn
>(httpVerb: HttpVerb) => {
  return (
    target: (this: TController, ...args: TArguments) => TReturn,
    { name, addInitializer }: ClassMethodDecoratorContext<TController>
  ) => {
    addInitializer(function () {
      RouteCollection.getInstance().add({
        controller: this.constructor.name,
        action: name.toString(), 
        httpVerb
      });
    });
  };
};


export const Get = action("get");

export const Post = action("post");
