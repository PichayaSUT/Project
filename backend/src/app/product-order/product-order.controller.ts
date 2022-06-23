import { Controller, Get, Post, Body, Patch, Param,Put, Delete } from '@nestjs/common';
import { ProductOrderService } from './product-order.service';
import { CreateProductOrderDto } from './dto/create-product-order.dto';
import { UpdateProductOrderDto } from './dto/update-product-order.dto';
import { catchError, map, Observable, of } from 'rxjs';
import{
  HttpStatus,
  HttpException,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ProductOrder} from './entities/product-order.entity';

@Controller('product-order')
export class ProductOrderController {
  constructor(private readonly productOrderService: ProductOrderService) {}


  //สร้างข้อมูลในตาราง Product_order
  @Post()
  create(@Body() productorder: ProductOrder): Observable<ProductOrder> {
    return this.productOrderService.create(productorder).pipe(
      map((data: any) => data),
      catchError((err) => of({ error: err.message })),
    );
  }
 
 //รับค่าด้วย id
  @Get(':id')
  findOne(@Param() params): Observable<ProductOrder> {
    return this.productOrderService.findOne(params.id);
  }

 //รับข้อมูลทั้งหมด
  @Get()
  findAll(): Observable<ProductOrder[]> {
    return this.productOrderService.findAll();
  }

  //ลบทีละตัวด้วย id
  @Delete(':id')
  deleteOne(@Param('id') id: string): Observable<any> {
    return this.productOrderService.deleteOne(Number(id));
  }

  //อัปเดตข้อมูลด้วย id
  @Put(':id')
  updateOne(
    @Param('id') id: string,
    @Body() productorder: ProductOrder,
  ): Observable<any> {
    return this.productOrderService.updateOne(Number(id), productorder);
  }
}
