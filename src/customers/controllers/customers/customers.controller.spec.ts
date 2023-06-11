import { Request } from 'express';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';

describe('CustomersController', () => {
  let controller: CustomersController;

  let requestMock = { query: {} } as unknown as Request;
  let responseMock = {
    status: jest.fn((x) => ({
      send: jest.fn((y) => y),
    })),
  } as unknown as Response;
  let statusResponseMock = { send: jest.fn((x) => x) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('get customer by id', () => {
  //   it('should return a status of 400', async () => {
  //     controller.getCustomer(requestMock, responseMock);
  //     expect(responseMock.status).toHaveBeenCalledWith(400);
  //     expect(statusResponseMock.send).toHaveBeenCalled();
  //   });
  // });
});
