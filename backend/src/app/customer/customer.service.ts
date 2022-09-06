import { Observable, from } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>
  ) { }

  async all() {
    return this.customerRepository.find()
  }
  create(createCustomerDto: CreateCustomerDto) {
    return 'This action adds a new customer';
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: string): Observable<Customer> {
    return from(this.customerRepository.createQueryBuilder("customer").select(["customer.id", "customer.phone_number", "customer.first_name", "customer.last_name", "customer.debt", "customer.credit"]).where("customer.phone_number = :id", { id }).getOne());
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return from(this.customerRepository.createQueryBuilder().update(Customer).set({ debt: updateCustomerDto.debt }).where("phone_number = :id", { id }).execute());
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
