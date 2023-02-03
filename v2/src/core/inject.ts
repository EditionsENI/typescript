import { DependencyCollection } from "./dependencyCollection";

export const Inject = <T, V>(key: symbol) => {
  return (target: undefined, ctx: ClassFieldDecoratorContext<T, V>) => {
    return function(this: T, value: V) {
      return DependencyCollection.getInstance().get<V>(key);
    }
  };
};
