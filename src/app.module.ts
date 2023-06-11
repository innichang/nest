import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from '@nestjs/config';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';
// import { EntityListenerMetadata } from 'typeorm/metadata/EntityListenerMetadata';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import entities from './typeorm';
import { UsersController } from './users/controllers/users/users.controller';
import { PostsController } from './posts/controller/posts/posts.controller';
import { CustomersController } from './customers/controllers/customers/customers.controller';
import { AuthService } from './auth/services/auth/auth.service';
import { UsersService } from './users/services/users/users.service';
import { PostsService } from './posts/service/posts/posts.service';
// import { JwtAuthGuard } from './auth/utils/jwt-auth.guard';
// import { APP_GUARD, Reflector } from '@nestjs/core';
// import * as Joi from 'joi';

@Module({
  imports: [
    CustomersModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '950922',
      database: 'nest_test',
      entities: entities,
      synchronize: true,
    }),
    AuthModule,
    PostsModule,
  ],
  controllers: [UsersController, PostsController, CustomersController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
    {
      provide: 'POST_SERVICE',
      useClass: PostsService,
    },
  ],
})
export class AppModule {}
