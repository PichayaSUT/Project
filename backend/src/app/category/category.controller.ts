import { Controller, Get, Post, Body, Patch, Param,Put, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  HttpStatus,
  HttpException,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  //สร้างข้อมูลในตาราง Category

@Post()
create(@Body() category: Category): Observable<Category> {
  return this.categoryService.create(category).pipe(
    map((data: any) => data),
    catchError((err) => of({ error: err.message })),
  );
}

//รับค่าด้วย id
@Get(':id')
findOne(@Param() params): Observable<Category> {
  return this.categoryService.findOne(params.id);
}
//รับช้อมูลทั้งหมด
@Get()
findAll(): Observable<Category[]> {
  return this.categoryService.findAll();
}

//ลบทีละตัวด้วย id
@Delete(':id')
deleteOne(@Param('id') id: string): Observable<any> {
  return this.categoryService.deleteOne(Number(id));
}

//อัปเดตข้อมูลด้วย id
@Put(':id')
updateOne(
  @Param('id') id: string,
  @Body() category: Category,
): Observable<any> {
  return this.categoryService.updateOne(Number(id), category);
}
}
