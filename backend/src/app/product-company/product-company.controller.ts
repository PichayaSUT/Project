
import { ProductCompanyService } from './product-company.service';
import { CreateProductCompanyDto } from './dto/create-product-company.dto';
import { UpdateProductCompanyDto } from './dto/update-product-company.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import{
  HttpStatus,
  HttpException,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { ProductCompany } from './entities/product-company.entity';
@ApiTags('Product Company')
@Controller('product-company')
export class ProductCompanyController {
  constructor(private readonly productCompanyService: ProductCompanyService) {}

      
    //สร้างข้อมูลในตาราง Product_company
    @Post()
    create(@Body() productcompany: CreateProductCompanyDto): Observable<ProductCompany> {
      return this.productCompanyService.create(productcompany).pipe(
        map((data: any) => data),
        catchError((err) => of({ error: err.message })),
      );
    }
   
   //รับค่าด้วย id
    @Get(':id')
    findOne(@Param() params): Observable<ProductCompany> {
      return this.productCompanyService.findOne(params.id);
    }

   //รับข้อมูลทั้งหมด
    @Get()
    findAll(): Observable<ProductCompany[]> {
      return this.productCompanyService.findAll();
    }
  
    //ลบทีละตัวด้วย id
    @Delete(':id')
    deleteOne(@Param('id') id: string): Observable<any> {
      return this.productCompanyService.deleteOne(Number(id));
    }
  
    //อัปเดตข้อมูลด้วย id
    @Put(':id')
    updateOne(
      @Param('id') id: string,
      @Body() productcompany: ProductCompany,
    ): Observable<any> {
      return this.productCompanyService.updateOne(Number(id), productcompany);
    }
}
