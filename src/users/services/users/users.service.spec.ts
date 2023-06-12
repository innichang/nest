import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, User as UserEntity } from 'src/typeorm';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  const mockUsersRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((user) =>
        Promise.resolve({ id: Date.now(), ...user }),
      ),
    findOne: jest.fn().mockImplementation((username) => username),
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

  it('should create a new user record and return', async () => {
    const mockUser = {
      username: 'test123',
      emailAddress: 'test123@email.com',
      password: 'test_password123',
    };

    expect(await service.createUser(mockUser)).toEqual({
      id: expect.any(Number),
      username: expect.any(String),
      emailAddress: expect.any(String),
    });
  });
});
