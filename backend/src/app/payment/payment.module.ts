import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CustomerModule } from '@app/customer/customer.module';
import { EmployeeModule } from '@app/employee/employee.module';
import { ProductsService } from '@app/products/products.service';
import { ProductsModule } from '@app/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]),
  CustomerModule, EmployeeModule, ProductsModule],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule { }
