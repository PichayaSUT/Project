import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { CustomerModule } from '@app/customer/customer.module';
import { EmployeeModule } from '@app/employee/employee.module';
import { ProductsModule } from '@app/products/products.module';
import { PaymentListModule } from '@app/payment-list/payment-list.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]),
  CustomerModule, EmployeeModule, ProductsModule, PaymentListModule],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule { }
