import {
  MiddlewareConsumer,
  Module,
  NestModule,
  Request,
  RequestMethod,
} from '@nestjs/common';
import { CustomersController } from './controllers/customers/customers.controller';
import { CustomersService } from './services/customers/customers.service';
import { ValidateCustomerMiddleware } from './middlewares/validate-customer.middleware';
import { ValidateCustomerAccountMiddleware } from './middlewares/validate-customer-account.middleware';
import { NextFunction, Response, request } from 'express';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        ValidateCustomerMiddleware,
        ValidateCustomerAccountMiddleware,
        (req: Request, res: Response, next: NextFunction) => {
          console.log('last middleware');
          next();
        },
      ) //can register many middlewares
      .exclude({
        path: 'customers/create',
        method: RequestMethod.POST,
      })
      .forRoutes(
        {
          path: 'customers/search/:id',
          method: RequestMethod.GET,
        },
        {
          path: 'customers/:id',
          method: RequestMethod.GET,
        },
      );
  }
}
