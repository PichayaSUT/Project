import { Payment } from "@app/payment/entities/payment.entity";
import { Product } from "@app/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('payment-list')
export class PaymentList {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Product, (product) => product.paymentList)
  @JoinColumn()
  product: Product;

  @Column()
  quantity: number;

  @Column()
  price_total: number;

  @ManyToOne(() => Payment, (payment) => payment.paymentList)
  payment: Payment;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;
}
