export type HttpVerb = "get" | "post" | "patch";

export interface IController<TModel = unknown> {
  getAll(test: any): Promise<ReadonlyArray<Readonly<TModel>>>;
  post(model: TModel): Promise<void>;
}

export interface IAction {
  controller: string;
  method: string;
}

export interface IRoute extends IAction {
  httpVerb: HttpVerb;
  path: string;
}
