import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  HttpStatus,
  HttpException,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { catchError, map, Observable, of } from 'rxjs';
//import { number } from 'joi';
import { ApiTags } from '@nestjs/swagger';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }


  //สร้างข้อมูลในตาราง Products
  @Post()
  create(@Body() product: CreateProductDto): Observable<Product> {
    return this.productsService.createProduct(product).pipe(
      map((data: any) => data),
      catchError((err) => of({ error: err.message })),
    );
  }

  //รับค่าด้วย id
  @Get(':id')
  findOne(@Param() params): Observable<Product> {
    return this.productsService.findOne(params.id);
  }
  //รับช้อมูลทั้งหมด
  /* @Get()
  findAll(): Observable<Product[]> {
    return this.productsService.findAll();
  } */
  @Get('/partID/:id')
  findPartID(@Param('id') id: string): Observable<Product[]> {
    return this.productsService.findPartID(String(id));
  }

  @Get('/seachName/:name')
  findLike(@Param('name') name: string): Observable<Product[]> {
    return this.productsService.findName(String(name));
  }

  //ลบทีละตัวด้วย id
  @Delete(':id')
  deleteOne(@Param('id') id: string): Observable<any> {
    return this.productsService.deleteOne(Number(id));
  }

  //อัปเดตข้อมูลด้วย id
  @Put(':id')
  updateOne(
    @Param('id') id: string,
    @Body() product: Product,
  ): Observable<any> {
    return this.productsService.updateOne(Number(id), product);
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
