
export class DependencyCollection {
  static #instance: DependencyCollection;

  #dependencies: Map<string, new () => unknown>;
  
  private constructor() {
    this.#dependencies = new Map();
  }

  static getInstance(): DependencyCollection {
    if(!this.#instance) {
        this.#instance = new DependencyCollection();
    }

    return this.#instance;
  }

  register<TDependency>(dependencyKey: string, ctor: new () => TDependency) {
    this.#dependencies.set(dependencyKey, ctor)
  }

  get<T>(dependencyKey: string): T {
    const ctor = this.#dependencies.get(dependencyKey);

    if(!ctor) {
      throw new Error(`Unknown dependency: ${dependencyKey.toString()}`);
    }
    
    return new ctor() as T;
  }
}
