import { HttpVerb, IAction, IRoute } from "./types";

export class RouteCollection {
  static #instance: RouteCollection;

  #routes: IRoute[];

  get routes() {
    return this.#routes;
  }
  
  private constructor() {
    this.#routes = [];
  }

  static getInstance(): RouteCollection {
    if(!this.#instance) {
        this.#instance = new RouteCollection();
    }

    return this.#instance;
}
  
  add(
    action: IAction,
    httpVerb: HttpVerb,
    path: string
  ) {
    this.#routes.push({
      ...action,
      httpVerb,
      path: `/${action.controller.replace('Controller', '').toLowerCase()}/${path}`
    });    
  }
}
