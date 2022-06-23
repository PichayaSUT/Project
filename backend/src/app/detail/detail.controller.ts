import { Controller, Get, Post, Body, Patch, Param, Delete,Put } from '@nestjs/common';
import { DetailService } from './detail.service';
import { CreateDetailDto } from './dto/create-detail.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';
import {
  HttpStatus,
  HttpException,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Detail } from './entities/detail.entity';
import { catchError, map, Observable, of } from 'rxjs';


@Controller('detail')
export class DetailController {
  constructor(private readonly detailService: DetailService) {}

   //สร้างข้อมูลในตาราง Detail
   @Post()
   create(@Body() detail: Detail): Observable<Detail> {
     return this.detailService.create(detail).pipe(
       map((data: any) => data),
       catchError((err) => of({ error: err.message })),
     );
   }
  
 //รับค่าด้วย id
   @Get(':id')
   findOne(@Param() params): Observable<Detail> {
     return this.detailService.findOne(params.id);
   }
 //รับช้อมูลทั้งหมด
   @Get()
   findAll(): Observable<Detail[]> {
     return this.detailService.findAll();
   }
 
   //ลบทีละตัวด้วย id
   @Delete(':id')
   deleteOne(@Param('id') id: string): Observable<any> {
     return this.detailService.deleteOne(Number(id));
   }
 
   //อัปเดตข้อมูลด้วย id
   @Put(':id')
   updateOne(
     @Param('id') id: string,
     @Body() detail: Detail,
   ): Observable<any> {
     return this.detailService.updateOne(Number(id), detail);
   }
}
