import { Employee } from './../../employee/entities/employee.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Customer } from '@app/customer/entities/customer.entity';
import { BaseEntity } from '@common/BaseEntity';
import { PaymentList } from '@app/payment-list/entities/payment-list.entity';

@Entity('payment')
export class Payment {
  @PrimaryColumn({ type: 'uuid'})
  id: string;

  @Column()
  discount: number;

  @Column()
  total: number;

  @Column()
  receive: number;

  @Column({ type: 'char', length: 1, comment: 'Q = QRpayment, C = cash, D = credit' })
  payment_type: string;

  @Column({ type: 'char', length: 1, comment: 'Y = yes, N = no' })
  status: string;

  @Column({ type: 'text'})
  payment_path: string;

  @ManyToOne(() => Employee, (employee) => employee.payments)
  employee: Employee

  @ManyToOne(() => Customer, (customer) => customer.payments)
  customer: Customer

  @OneToMany(() => PaymentList, (paymentList) => paymentList.payment)
  paymentList : PaymentList[];

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

}
