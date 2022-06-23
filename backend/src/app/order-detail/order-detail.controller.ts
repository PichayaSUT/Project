import { Controller, Get, Post, Body, Patch, Param,Put, Delete } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

import{
  HttpStatus,
  HttpException,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';
import { OrderDetail } from './entities/order-detail.entity';

@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  //สร้างข้อมูลในตาราง Order_detail
  @Post()
  create(@Body() orderdetail: OrderDetail): Observable<OrderDetail> {
    return this.orderDetailService.create(orderdetail).pipe(
      map((data: any) => data),
      catchError((err) => of({ error: err.message })),
    );
  }
 
 //รับค่าด้วย id
  @Get(':id')
  findOne(@Param() params): Observable<OrderDetail> {
    return this.orderDetailService.findOne(params.id);
  }

 //รับข้อมูลทั้งหมด
  @Get()
  findAll(): Observable<OrderDetail[]> {
    return this.orderDetailService.findAll();
  }

  //ลบทีละตัวด้วย id
  @Delete(':id')
  deleteOne(@Param('id') id: string): Observable<any> {
    return this.orderDetailService.deleteOne(Number(id));
  }

  //อัปเดตข้อมูลด้วย id
  @Put(':id')
  updateOne(
    @Param('id') id: string,
    @Body() orderdetail: OrderDetail,
  ): Observable<any> {
    return this.orderDetailService.updateOne(Number(id), orderdetail);
  }
}
