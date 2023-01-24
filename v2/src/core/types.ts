export type HttpVerb = "get" | "post" | "patch";

export interface IController<TModel = unknown> {
    getAll(): Promise<ReadonlyArray<Readonly<TModel>>>;
    get(id: string): Promise<Readonly<TModel>>;
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