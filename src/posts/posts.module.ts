import { Module } from '@nestjs/common';
import { PostsService } from './service/posts/posts.service';
import { PostsController } from './controller/posts/posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post, User } from 'src/typeorm';
import { UsersService } from 'src/users/services/users/users.service';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { AppModule } from 'src/app.module';
import { PostRepository } from 'src/typeorm/repository/post.repository';

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
