import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { forkJoin, from, map, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { CreatePaymentDto, SavePayment } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { CustomerService } from '@app/customer/customer.service';
import { Employee } from '@app/employee/entities/employee.entity';
import { EmployeeService } from '@app/employee/employee.service';
import { Customer } from '@app/customer/entities/customer.entity';
import { PaymentInterface } from './interface/payment.interface';
import * as fs from 'fs'

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentReposity: Repository<Payment>,

    @Inject(CustomerService)
    private readonly customerService: CustomerService,

    @Inject(EmployeeService)
    private readonly employeeService: EmployeeService,
  ) { }

  createPaymentJson(data: SavePayment): string {
    console.log(data);
    
    fs.writeFileSync(`D:/Project/data/json/555.json`, JSON.stringify(data))
    return ""
  }

  create(createPaymentDto: CreatePaymentDto) {
    const customer = this.customerService.findOne(createPaymentDto.customerPhone)
    const employee = this.employeeService.findOneByEmail(createPaymentDto.employeeEmail)

    return forkJoin({
      customerValue: customer,
      employeeValue: employee,
    }).pipe(
      map(({ customerValue, employeeValue }) => {
        if (createPaymentDto.paymentType === 'D') {
          customerValue.debt += createPaymentDto.total
          this.customerService.update(createPaymentDto.customerPhone, customerValue)
        }
        const newPayment = new Payment();
        newPayment.id = createPaymentDto.paymentId;
        newPayment.discount = createPaymentDto.discount;
        newPayment.total = createPaymentDto.total;
        newPayment.receive = createPaymentDto.receive;
        newPayment.payment_type = createPaymentDto.paymentType;
        newPayment.status = createPaymentDto.paymentStatus;
        newPayment.payment_path = createPaymentDto.paymentPath;
        newPayment.customer = customerValue;
        newPayment.employee = employeeValue;

        this.paymentReposity.save(newPayment).then((res) => {
          console.log(res);
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

  findAll(id: string): Observable<Payment[]> {

    return from(
      this.paymentReposity
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
        .getMany());
  }

  findOne(id: string) {
    return ""
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
