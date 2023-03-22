import { DependencyContainer } from "./dependencyContainer";

export const Inject = <TClass, TValue>(
  target: undefined, 
  { 
    name, 
    private: isPrivate 
  }: ClassFieldDecoratorContext<TClass, TValue>
) => {
  return function(this: TClass) {
    const dependencyKey = name.toString();
    return DependencyContainer.getInstance().get<TValue>(
      isPrivate 
        ? dependencyKey.replace("#", "") 
        : dependencyKey
    );
  }
};
