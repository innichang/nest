import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/typeorm';
import { SerializedUser } from '../src/users/types';
import {
  createUser,
  createdUser,
  invalidUserRequest,
  mockUser,
  registeredUser,
  serializedUser,
} from './test-data/user/user.data.e2e';
import { CreateUserDto } from '../src/users/dtos/CreateUser.dto';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  let mockUsersRepository = {
    find: jest.fn().mockResolvedValue([mockUser]),
    findOne: jest.fn().mockResolvedValue(new SerializedUser(serializedUser)),
    create: jest.fn().mockResolvedValue(createdUser),
    save: jest.fn().mockResolvedValue(registeredUser),
    encodePassword: jest.fn().mockResolvedValue('test_hashed_password'),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUsersRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('SUCCESS: should return all users in an array', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect([mockUser]);
  });

  it('SUCCESS: should return user by username', () => {
    return request(app.getHttpServer())
      .get('/users/username/:username')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(serializedUser);
  });

  it('ERROR: should throw an error due to invalid username', () => {
    return request(app.getHttpServer())
      .post('/users/signup')
      .set('Accept', 'application/json')
      .send({
        username: 1234,
        password: 'test123',
        email: 'test@email.com',
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.statusCode).toEqual(400);
        expect(HttpStatus.BAD_REQUEST);
      });
  });

  // it('SUCCESS: should create user and return value', () => {
  //   return request(app.getHttpServer())
  //     .post('/users/signup')
  //     .expect('Content-Type', /json/)
  //     .send(createUser)
  //     .set('Accept', 'application/json')
  //     .expect(201)
  //     .then((response) => {
  //       expect(response.body).toEqual({
  //         id: expect.any(Number),
  //         username: 'test',
  //         emailAddress: 'test@email.com',
  //       });
  //     });
  // });
});
