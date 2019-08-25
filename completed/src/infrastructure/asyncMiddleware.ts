import { 
  RequestHandler, 
  Request, 
  Response, 
  NextFunction 
} from "express";

const asyncMiddleware = (handler: RequestHandler) => {
  return (
    request: Request, 
    response: Response, 
    next: NextFunction
  ) => {
      Promise.resolve(
        handler(request, response, next)
      ).catch(next);
  };  
};

export { asyncMiddleware };