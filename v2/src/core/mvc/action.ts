import { HttpVerb } from "./types";
import { RouteCollection } from "./routeCollection";

const action = <
  TController extends Object, 
>(httpVerb: HttpVerb) => {
  return (
    target: (this: TController, ...args: any[]) => unknown,
    context: ClassMethodDecoratorContext<TController>
  ) => {
    context.addInitializer(function () {
      RouteCollection.getInstance().add({
        controller: this.constructor.name,
        action: context.name.toString(), 
        httpVerb
      });
    });
  };
};


export const Get = action("get");

export const Post = action("post");
