import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from 'src/posts/service/posts/posts.service';
import { UsersService } from 'src/users/services/users/users.service';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@nestjs/common';
import { User } from 'src/typeorm';

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Post, User])],
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
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
