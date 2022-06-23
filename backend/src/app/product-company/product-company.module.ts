import { Module } from '@nestjs/common';
import { ProductCompanyService } from './product-company.service';
import { ProductCompanyController } from './product-company.controller';
import { ProductCompany } from './entities/product-company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([ProductCompany])], 
  controllers: [ProductCompanyController],
  providers: [ProductCompanyService],
  exports: [ProductCompanyService],
})
export class ProductCompanyModule {}
