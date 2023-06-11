import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from 'src/users/services/users/users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUserService = {
    getUsers: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
    getUserByName: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
    getUserById: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
    createUser: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: 'USER_SERVICE',
          useClass: UsersService,
        },
      ],
    })
      .overrideProvider('USER_SERVICE')
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>('USER_SERVICE');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('it should get all users', async () => {
    const mockUser = {
      id: 1,
      username: 'test',
      password: 'test',
      emailAddress: 'test',
      posts: [],
    };

    jest.spyOn(service, 'getUsers').mockResolvedValue([mockUser]);

    const result = await controller.getUsers();

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          emailAddress: expect.any(String),
          id: expect.any(Number),
          username: expect.any(String),
          password: expect.any(String),
          posts: expect.any(Array),
        }),
      ]),
    );
  }),
    it('it should get user by name', async () => {
      const mockUser = {
        id: 1,
        username: 'test_username',
        emailAddress: 'test@gmail.com',
        password: 'testpassword',
        posts: [],
      };

      jest.spyOn(service, 'getUserByName').mockResolvedValue(mockUser);

      const result = await controller.getUsersByName('test_username');

      expect(result).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          username: expect.any(String),
          emailAddress: expect.any(String),
        }),
      );
    }),
    it('it should get user by id', async () => {
      const mockUser = {
        id: 1,
        username: 'test_username',
        emailAddress: 'test@gmail.com',
        password: 'testpassword',
        posts: [],
      };

      jest.spyOn(service, 'getUserById').mockResolvedValue(mockUser);

      const result = await controller.getUserById(1);

      expect(result).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          username: expect.any(String),
          emailAddress: expect.any(String),
        }),
      );
    }),
    it('it should return created user', async () => {
      const mockUser = {
        id: 1,
        username: 'test_username',
        emailAddress: 'test@gmail.com',
        password: 'testpassword',
        posts: [],
      };

      jest.spyOn(service, 'createUser').mockResolvedValue(mockUser);

      const result = await controller.createUser(mockUser);

      expect(result).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          username: expect.any(String),
          emailAddress: expect.any(String),
        }),
      );
    });
});
