import { DependencyCollection } from "./dependencyCollection";

export const Inject = <TClass, TValue>(key: symbol) => {
  return (target: undefined, ctx: ClassFieldDecoratorContext<TClass, TValue>) => {
    return function(this: TClass, value: TValue) {
      return DependencyCollection.getInstance().get<TValue>(key);
    }
  };
};
