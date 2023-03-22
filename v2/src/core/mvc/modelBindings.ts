export class ModelBindings {
  static #instance: ModelBindings;
  #bindings: Map<`${string}#${string}`, string> = new Map();

  private constructor() {

  }
  
  static getInstance(): ModelBindings{
    if (!this.#instance) {
      this.#instance = new ModelBindings ();
    }
  
    return this.#instance;
  }

  bind(
    controllerName: string, 
    actionName: string, 
    modelName: string
  ) {
    this.#bindings.set(`${
        controllerName
      }#${
        actionName
      }`, 
      modelName
    );
  }

  get(controllerName: string, actionName: string) {
    return this.#bindings.get(`${controllerName}#${actionName}`)
  }
}
