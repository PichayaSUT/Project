import { Module } from '@nestjs/common';
import { ProductGradeService } from './product-grade.service';
import { ProductGradeController } from './product-grade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product_grade } from './entities/product-grade.entity';

@Module({

  imports: [TypeOrmModule.forFeature([Product_grade])],  
  controllers: [ProductGradeController],
  providers: [ProductGradeService],
  exports: [ProductGradeService],
})
export class ProductGradeModule {}
