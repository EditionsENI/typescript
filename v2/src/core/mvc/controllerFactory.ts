export class ControllerFactory {
  static #instance: ControllerFactory;
  readonly #controllers: Map<string, unknown> = new Map();

  private constructor() {

  }
  
  static getInstance(): ControllerFactory {
    if (!this.#instance) {
      this.#instance = new ControllerFactory ();
    }
  
    return this.#instance;
  } 
  
  register(ctor: new () => unknown) {
    this.#controllers.set(ctor.name, new ctor());
  }
  
  get(controllerName: string) {
    const controller = this.#controllers.get(controllerName);
    
    if(!controller) {
      throw new Error(`Unknown controller: ${controllerName}`);
    }
    
    return controller;
  }  
}
