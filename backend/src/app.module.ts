import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './lib/config/server';
import { validationSchema } from './lib/config/validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './lib/config/database';
import { EmployeeModule } from './app/employee/employee.module';
import { ProductsModule } from './app/products/products.module';
import { AuthModule } from './auth/auth.module';
import { PrivilegeModule } from './app/privilege/privilege.module';
import { RoleModule } from './app/role/role.module';
import { CompanyModule } from './app/company/company.module';
import { ProductGradeModule } from '@app/product-grade/product-grade.module';
import { DetailModule } from '@app/detail/detail.module';
import { ProductCompanyModule } from '@app/product-company/product-company.module';
import { CodeModule } from '@app/code/code.module';
import { UnitModule } from '@app/unit/unit.module';
import { OrderDetailModule } from '@app/order-detail/order-detail.module';
import { ProductOrderModule } from '@app/product-order/product-order.module';
import { ProductStorageModule } from '@app/product-storage/product-storage.module';
import { CategoryModule } from "@app/category/category.module"
import { PaymentModule } from './app/payment/payment.module';
import { CustomerModule } from './app/customer/customer.module';
import { PaymentListModule } from './app/payment-list/payment-list.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: config,
      inject: [],
    }),

    EmployeeModule,
    ProductsModule,
    AuthModule,
    PrivilegeModule,
    RoleModule,
    CompanyModule,
    ProductGradeModule,
    DetailModule,
    ProductCompanyModule,
    CodeModule,
    UnitModule,
    OrderDetailModule,
    ProductOrderModule,
    ProductStorageModule,
    CategoryModule,
    PaymentModule,
    CustomerModule,
    PaymentListModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// bank ไม่ได้ import
