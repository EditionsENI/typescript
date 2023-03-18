import { Server } from "./core/server";
import { 
  DependencyContainer 
} from './core/ioc/dependencyContainer';
import { FileStorage } from './core/data/fileStorage';

(async () => {
  DependencyContainer.getInstance().register(
    "storage", 
    FileStorage
  );  
  const server = new Server();
  await server.start();
})();
