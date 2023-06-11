import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateCustomerAccountMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('customer account');
    const {
      headers: { status },
    } = req;

    if (status) {
      next();
    } else {
      res.status(401).send({ error: 'Invalid Account' });
    }
  }
}
