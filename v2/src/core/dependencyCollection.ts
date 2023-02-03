
export class DependencyCollection {
  static #instance: DependencyCollection;

  #dependencies: Map<symbol, new () => unknown>;
  
  private constructor() {
    this.#dependencies = new Map();
  }

  static getInstance(): DependencyCollection {
    if(!this.#instance) {
        this.#instance = new DependencyCollection();
    }

    return this.#instance;
  }

  register<TDependency>(dependencyKey: symbol, ctor: new () => TDependency) {
    this.#dependencies.set(dependencyKey, ctor)
  }

  get<T>(dependencyKey: symbol): T {
    const ctor = this.#dependencies.get(dependencyKey);

    if(!ctor) {
      throw new Error(`Unknown dependency: ${dependencyKey.toString()}`);
    }
    
    return new ctor() as T;
  }
}
