import { 
  dependencyService 
} from "../infrastructure/dependencyService";

const Dependency = (key: Symbol) => {
  const decorator: ClassDecorator = (target: any) => {
    dependencyService.add(key, target);
  };
  
  return decorator;
};

export { Dependency };
