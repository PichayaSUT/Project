import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { forkJoin, from, map, Observable } from 'rxjs';
import { IsNull, Repository } from 'typeorm';
import { CreatePaymentDto, SavePayment } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { CustomerService } from '@app/customer/customer.service';
import { Employee } from '@app/employee/entities/employee.entity';
import { EmployeeService } from '@app/employee/employee.service';
import * as fs from 'fs'
import { Product } from '@app/products/entities/product.entity';
import { ProductsService } from '@app/products/products.service';
import { PaymentListService } from '@app/payment-list/payment-list.service';
import { PaymentListCreate } from '@app/payment-list/dto/create-payment-list.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    @Inject(CustomerService)
    private readonly customerService: CustomerService,

    @Inject(EmployeeService)
    private readonly employeeService: EmployeeService,

    @Inject(ProductsService)
    private readonly productService: ProductsService,

    @Inject(PaymentListService)
    private readonly paymentListService: PaymentListService,
  ) { }

  createPaymentJson(data: SavePayment): string {
    fs.writeFileSync(`D:/Project/data/json/${data.paymentId}.json`, JSON.stringify(data))
    console.log(`create : ${data.paymentId}.json success`);
    return ""
  }

  createPaymentList(data: SavePayment) {
    const id = data.paymentId
    const list = data.list
    const paymentId = from(this.paymentRepository
      .createQueryBuilder("payment")
      .where("payment.id = :id", { id })
      .getOne())
    const product = this.productService.findOne(list[0].barcode)
    return forkJoin({
      productValue: product,
      paymentValue: paymentId,
    }).pipe(
      map(({ productValue, paymentValue }) => {
        console.log('PaymentList');
        const obj = {
          paymentId: paymentValue,
          productId: productValue,
          quantity: list[0].quantity,
          price_total: list[0].priceSell
        }
        this.paymentListService.create(obj)
        return obj
      })
    )

  }

  create(data: SavePayment) {
    const customer = this.customerService.findOne(data.customer.phone)
    const employee = this.employeeService.findOneByEmail(data.employee.email)
    for (let i = 0; i < data.list.length; i++) {
      this.productService.updateByPayment(data.list[i])
    }
    /* (): Observable<Employee> => {
      if (!(data.employee.email === undefined)) {
        console.log('start save database');
        return this.employeeService.findOneByEmail(data.employee.email)
      } else {
        console.log('Email is NUll'); 
        return null
      }
    } */
    return forkJoin({
      customerValue: customer,
      employeeValue: employee,
    }).pipe(
      map(({ customerValue, employeeValue }) => {
        if (data.paymentType === 'D') {
          customerValue.debt += data.total
          this.customerService.update(data.customer.phone, customerValue)
        }
        const newPayment = new Payment();
        if (!(employeeValue === null)) {
          newPayment.employee = employeeValue;
        }
        if (!(customerValue === null)) {
          newPayment.customer = customerValue;
        }

        newPayment.id = data.paymentId;
        newPayment.discount = data.discount;
        newPayment.total = data.total;
        newPayment.receive = data.receive;
        newPayment.payment_type = data.paymentType;
        newPayment.status = data.paymentStatus;
        newPayment.payment_path = `D:/Project/data/json/${data.paymentId}.json`;

        this.paymentRepository.save(newPayment).then((res) => {
          if (!res) {
            throw new HttpException(
              'can not save category',
              HttpStatus.BAD_REQUEST,
            );
          }
        });
        return newPayment;
      })
    )
  }

  findAll(id: string): Observable<Payment> {
    return from(
      this.paymentRepository
        .createQueryBuilder("payment")
        .select([
          "payment.id",
          "payment.discount",
          "payment.total",
          "payment.receive",
          "payment.payment_type",
          "payment.status",
          "payment.payment_path",
          "payment.customer",
          "payment.employee",
        ])
        .where("payment.id = :id", { id })
        .getOne());
  }

  findOne(id: string) {
    return ''//this.paymentRepository.createQueryBuilder()
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
