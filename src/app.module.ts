import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import entities, { Post, User } from './typeorm';
import { UsersController } from './users/controllers/users/users.controller';
import { PostsController } from './posts/controller/posts/posts.controller';
import { AuthService } from './auth/services/auth/auth.service';
import { UsersService } from './users/services/users/users.service';
import { PostsService } from './posts/service/posts/posts.service';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { HealthCheckController } from './health-check/health-check.controller';
import { HealthCheckModule } from './health-check/health-check.module';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
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
    TypeOrmModule.forFeature([User, Post]),
    AuthModule,
    PostsModule,
    HealthCheckModule,
    TerminusModule,
    HttpModule,
  ],
  controllers: [
    UsersController,
    PostsController,
    AppController,
    HealthCheckController,
  ],
  providers: [
    AppService,
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
