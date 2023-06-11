import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
        username: 'test',
        emailAddress: 'test@gmail.com',
      },
    ];
    jest.spyOn(service, 'getUsers').mockImplementation(() => result);

    expect(await controller.getUsers()).toBe(result);
  });
});
