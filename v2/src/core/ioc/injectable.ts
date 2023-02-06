import { DependencyCollection } from "./dependencyCollection";

export const Injectable = <TClass>(key?: string) => {
  return (target: new (...args: unknown[]) => TClass, context: ClassDecoratorContext) => {
    DependencyCollection.getInstance().register(key ?? target.name.toUpperCase(), target);
  };
};
