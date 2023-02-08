import { DependencyCollection } from "./dependencyCollection";

export const Inject = <TClass, TValue>(key?: string) => {
  return (target: undefined, { name }: ClassFieldDecoratorContext<TClass, TValue>) => {
    return function(this: TClass, value: TValue) {    
      return DependencyCollection.getInstance().get<TValue>(key ?? name.toString().replace('#', '').toUpperCase());
    }
  };
};
