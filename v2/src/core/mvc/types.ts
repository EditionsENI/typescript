export type HttpVerb = "get" | "post";

export interface IRoute {
  controller: string;
  action: string;
  httpVerb: HttpVerb;
  path: string;
};

export type Binding = `${string}#${string}`;