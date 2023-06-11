import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from '@nestjs/config';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';
// import { EntityListenerMetadata } from 'typeorm/metadata/EntityListenerMetadata';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import entities from './typeorm';
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
  controllers: [],
  providers: [],
})
export class AppModule {}
