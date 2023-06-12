import { CreateUserDto } from '../../../src/users/dtos/CreateUser.dto';

export const mockUser = {
  id: 1,
  username: 'test',
  password: 'test_pw',
  emailAddress: 'test@email.com',
};

export const serializedUser = {
  id: 1,
  username: 'test',
  emailAddress: 'test@email.com',
};

export const createUser: CreateUserDto = {
  username: 'test',
  password: 'test_password',
  emailAddress: 'test@email.com',
};

export const createdUser = {
  username: 'test',
  password: 'test_password',
  emailAddress: 'test@email.com',
};

export const invalidUserRequest = {
  username: 1234,
  password: 'test_password',
  emailAddress: 'test@email.com',
};

export const registeredUser = {
  id: 1,
  username: 'test',
  emailAddress: 'test@email.com',
};
