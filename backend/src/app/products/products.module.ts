import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCompanyModule } from '@app/product-company/product-company.module';
import { CodeModule } from '@app/code/code.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),
  ProductCompanyModule, CodeModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
