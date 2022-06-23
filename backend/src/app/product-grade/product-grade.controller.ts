import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CreateProductGradeDto } from './dto/create-product-grade.dto';
import { UpdateProductGradeDto } from './dto/update-product-grade.dto';
import {
  HttpStatus,
  HttpException,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ProductGradeService} from './product-grade.service';
import { catchError, map, Observable, of } from 'rxjs';
import { Product_grade } from './entities/product-grade.entity';

@Controller('product-grade')
export class ProductGradeController {
  constructor(private readonly productGradeService: ProductGradeService) {}

    
    //สร้างข้อมูลในตาราง Product_grade
    @Post()
    create(@Body() productgrade: Product_grade): Observable<Product_grade> {
      return this.productGradeService.create(productgrade).pipe(
        map((data: any) => data),
        catchError((err) => of({ error: err.message })),
      );
    }
   
  //รับค่าด้วย id
    @Get(':id')
    findOne(@Param() params): Observable<Product_grade> {
      return this.productGradeService.findOne(params.id);
    }
  //รับช้อมูลทั้งหมด
    @Get()
    findAll(): Observable<Product_grade[]> {
      return this.productGradeService.findAll();
    }
  
    //ลบทีละตัวด้วย id
    @Delete(':id')
    deleteOne(@Param('id') id: string): Observable<any> {
      return this.productGradeService.deleteOne(Number(id));
    }
  
    //อัปเดตข้อมูลด้วย id
    @Put(':id')
    updateOne(
      @Param('id') id: string,
      @Body() product: Product_grade,
    ): Observable<any> {
      return this.productGradeService.updateOne(Number(id), product);
    }
  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productsService.create(createProductDto);
  // }

  // @Get()
  // findAll() {
  //   return this.productsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
}
