import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { Customer } from 'src/customers/types/Customers';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: 1,
      email: 'inni@gmail.com',
      name: 'inni inni',
    },
    {
      id: 2,
      email: 'sra@gmail.com',
      name: 'sra sra',
    },
    {
      id: 3,
      email: 'cony@gmail.com',
      name: 'cony cony',
    },
  ];

  getCustomers() {
    return this.customers;
  }

  findCustomerById(id: number) {
    return this.customers.find((user) => user.id === id);
  }

  createCustomer(customerDto: CreateCustomerDto) {
    this.customers.push(customerDto);
  }
}
