import { Controller, Get, Post, Body, Patch, Param,Put, Delete } from '@nestjs/common';
import { ProductStorageService } from './product-storage.service';
import {
  HttpStatus,
  HttpException,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';
import { ProductStorage } from './entities/product-storage.entity';

@Controller('productstorage-storage')
export class ProductStorageController {
  constructor(private readonly productStorageService: ProductStorageService) {}

//สร้างข้อมูลในตาราง Product_storage

@Post()
create(@Body() productstorage: ProductStorage): Observable<ProductStorage> {
  return this.productStorageService.create(productstorage).pipe(
    map((data: any) => data),
    catchError((err) => of({ error: err.message })),
  );
}

//รับค่าด้วย id
@Get(':id')
findOne(@Param() params): Observable<ProductStorage> {
  return this.productStorageService.findOne(params.id);
}
//รับช้อมูลทั้งหมด
@Get()
findAll(): Observable<ProductStorage[]> {
  return this.productStorageService.findAll();
}

//ลบทีละตัวด้วย id
@Delete(':id')
deleteOne(@Param('id') id: string): Observable<any> {
  return this.productStorageService.deleteOne(Number(id));
}

//อัปเดตข้อมูลด้วย id
@Put(':id')
updateOne(
  @Param('id') id: string,
  @Body() productstorage: ProductStorage,
): Observable<any> {
  return this.productStorageService.updateOne(Number(id), productstorage);
}
}
