import { Module } from '@nestjs/common';
import { PaymentListService } from './payment-list.service';
import { PaymentListController } from './payment-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentList } from './entities/payment-list.entity';
import { ProductsModule } from '@app/products/products.module';
import { PaymentModule } from '@app/payment/payment.module';

@Module({
  imports:[TypeOrmModule.forFeature([PaymentList])],
  controllers: [PaymentListController],
  providers: [PaymentListService],
  exports: [PaymentListService]
})
export class PaymentListModule {}
