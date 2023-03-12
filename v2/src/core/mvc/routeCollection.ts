import { IRoute } from "./types";

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
    if (!this.#instance) {
      this.#instance = new RouteCollection();
    }

    return this.#instance;
  }

  add(
    route: Omit<IRoute, 'path'>
  ) {
    this.#routes.push({
      ...route,
      path: `/${route.controller.replace('Controller', '').toLowerCase()}`
    });
  }
}
