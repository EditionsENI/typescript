export type HttpVerb = "get" | "post";

export interface IRoute {
  controller: string;
  action: string;
  httpVerb: HttpVerb;
  path: string;
};
