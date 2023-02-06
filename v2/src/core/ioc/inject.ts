import { DependencyCollection } from "./dependencyCollection";

export const Inject = <TClass, TValue>(key?: string) => {
  return (target: undefined, { name }: ClassFieldDecoratorContext<TClass, TValue>) => {
    return function(this: TClass, value: TValue) {    
      console.log(key ?? name.toString().replace('#', '').toUpperCase());
      console.log(value);
      return DependencyCollection.getInstance().get<TValue>(key ?? name.toString().replace('#', '').toUpperCase());
    }
  };
};
