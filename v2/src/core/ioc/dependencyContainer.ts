export class DependencyContainer {
  static #instance: DependencyContainer;
  #dependencies: Map<string, new (...args: unknown[]) => unknown>;
  
  private constructor() {
    this.#dependencies = new Map();
  }

  static getInstance(): DependencyContainer {
    if (!this.#instance) {
      this.#instance = new DependencyContainer();
    }

    return this.#instance;
  }

  register<TDependency>(
    dependencyKey: string, 
    ctor: new (...args: any[]) => TDependency
  ) {
    this.#dependencies.set(dependencyKey, ctor)
  }

  get<T>(dependencyKey: string): T {
    const ctor = this.#dependencies.get(dependencyKey);
  
    if(!ctor) {
      throw new Error(`Unknown dependency: ${
        dependencyKey.toString()
      }`);
    }
      
    return new ctor() as T;
  }
}
