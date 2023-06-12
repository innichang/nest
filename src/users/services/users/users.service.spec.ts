import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, User as UserEntity } from 'src/typeorm';
import { Repository } from 'typeorm';
import { mockUser } from '../../../../test/test-data/user/user.data.e2e';
import { serializedUser } from '../../../../test/test-data/user/user.data.e2e';
import { createUser } from '../../../../test/test-data/user/user.data.e2e';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  const mockUsersRepository = {
    find: jest.fn().mockResolvedValue([mockUser]),
    findOne: jest.fn().mockResolvedValue(serializedUser),
    create: jest.fn().mockResolvedValue(createUser),
    save: jest.fn().mockResolvedValue({
      id: 1,
      username: 'test_username',
      emailAddress: 'test@email.com',
      password: 'test_password',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: 'USER_SERVICE', useClass: UsersService },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUsersRepository,
        },
      ],
    })
      .overrideProvider(getRepositoryToken(UserEntity))
      .useValue(mockUsersRepository)
      .compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>('UserRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('SUCCESS: should return an array of users', async () => {
    const result = await service.getUsers();

    expect(result).toEqual([mockUser]);
  });

  it('SUCCESS: should return a user by username', async () => {
    const result = await service.getUserByName('test_username');

    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        username: serializedUser.username,
        emailAddress: expect.any(String),
      }),
    );
  });

  it('should create a new user record and return', async () => {
    expect(await service.createUser(mockUser)).toEqual({
      id: expect.any(Number),
      username: expect.any(String),
      emailAddress: expect.any(String),
    });
  });
});
