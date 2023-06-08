import { Injectable, NestMiddleware, Type, mixin } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function AuthMiddlewareCreator(options: any): Type<NestMiddleware> {
  @Injectable()
  class RoleCheckerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
      const { value } = options;
      const { role } = req.headers;

      // if(role == 'admin'){

      // }
      next();
    }
  }
  return mixin(RoleCheckerMiddleware);
}
