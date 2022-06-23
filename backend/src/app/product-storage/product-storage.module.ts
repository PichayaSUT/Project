import { Module } from '@nestjs/common';
import { ProductStorageService } from './product-storage.service';
import { ProductStorageController } from './product-storage.controller';
import { ProductStorage } from './entities/product-storage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([ProductStorage])],
  controllers: [ProductStorageController],
  providers: [ProductStorageService],
  exports: [ProductStorageService],
})
export class ProductStorageModule {}
