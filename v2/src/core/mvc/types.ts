export type HttpVerb = "get" | "post" | "patch";

export interface IAction {
  controller: string;
  method: string;
}

export interface IRoute extends IAction {
  httpVerb: HttpVerb;
  path: string;
}

export type Binding = `${string}#${string}`;