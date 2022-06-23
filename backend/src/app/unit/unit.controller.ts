import { Controller, Get, Post, Body, Patch, Param,Put, Delete } from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import {
  HttpStatus,
  HttpException,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Unit } from './entities/unit.entity';
import { catchError, map, Observable, of } from 'rxjs';


@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

 
    //สร้างข้อมูลในตาราง Unit
    @Post()
    create(@Body() unit: Unit): Observable<Unit> {
      return this.unitService.create(unit).pipe(
        map((data: any) => data),
        catchError((err) => of({ error: err.message })),
      );
    }
   
  //รับค่าด้วย id
    @Get(':id')
    findOne(@Param() params): Observable<Unit> {
      return this.unitService.findOne(params.id);
    }
  //รับช้อมูลทั้งหมด
    @Get()
    findAll(): Observable<Unit[]> {
      return this.unitService.findAll();
    }
  
    //ลบทีละตัวด้วย id
    @Delete(':id')
    deleteOne(@Param('id') id: string): Observable<any> {
      return this.unitService.deleteOne(Number(id));
    }
  
    //อัปเดตข้อมูลด้วย id
    @Put(':id')
    updateOne(
      @Param('id') id: string,
      @Body() unit: Unit,
    ): Observable<any> {
      return this.unitService.updateOne(Number(id), unit);
    }
}
