import { Module } from '@nestjs/common';
import { PostsService } from './service/posts/posts.service';
import { PostsController } from './controller/posts/posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/services/users/users.service';
import { AuthService } from '../auth/services/auth/auth.service';
import { PostRepository } from '../typeorm/repository/post.repository';
import { UsersModule } from '../users/users.module';
import { Post, User } from '../typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User, PostRepository]),
    UsersModule,
  ],
  controllers: [PostsController],
  providers: [
    {
      provide: 'POST_SERVICE',
      useClass: PostsService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
})
export class PostsModule {}
