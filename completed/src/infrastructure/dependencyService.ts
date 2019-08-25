class DependencyService {
  private dependencies: Array<[Symbol, new () => unknown]>;

  constructor() {
    this.dependencies = [];
  }  

  add(key: Symbol, ctor: new () => unknown) {
    this.dependencies.push([key, ctor]);
  }

  resolve(key: Symbol) {
    const dependency = this.dependencies.find(dependency => {
      return dependency[0] === key;
    });
    
    if (!dependency) {
      throw new Error(`No dependency found for ${
        key.toString()
      } key!`);
    } else {
      const ctor = dependency[1];
      return new ctor();
    }    
  }  
}

const dependencyService = new DependencyService();

export { dependencyService };
