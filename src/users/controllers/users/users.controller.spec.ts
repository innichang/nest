import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from 'src/users/services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User as UserEntity } from 'src/typeorm';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([UserEntity])],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of users', async () => {
    const result = [
      {
        id: 1,
        username: 'test_username',
        password: 'test_password',
        emailAddress: 'test@email.com',
        posts: [],
      },
    ];
    jest.spyOn(service, 'getUsers').mockResolvedValue(result);

    expect(await controller.getUsers()).toEqual(result);
  });
});
