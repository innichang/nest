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
  let service: PostsService;

  const mockPostsService = {};

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
    })
      .overrideProvider('POST_SERVICE')
      .useValue(mockPostsService)
      .compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should return an array of posts', async () => {
  //   const mockPost = {
  //     id: 1,
  //     title: 'test_title',
  //     description: 'test_description',
  //     user: 1,
  //   };
  //   jest.spyOn(service, 'getPost').mockResolvedValue([mockPost]);

  //   const result = await service.getPost();

  //   expect(result).toEqual(
  //     expect.arrayContaining([
  //       expect.objectContaining([
  //         {
  //           id: expect.any(Number),
  //           title: expect.any(String),
  //           description: expect.any(String),
  //           user: expect.any(Number),
  //         },
  //       ]),
  //     ]),
  //   );
  // });
});
