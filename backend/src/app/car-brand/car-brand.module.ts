import { Module } from '@nestjs/common';
import { CarBrandService } from './car-brand.service';
import { CarBrandController } from './car-brand.controller';

@Module({
  controllers: [CarBrandController],
  providers: [CarBrandService]
})
export class CarBrandModule {}
