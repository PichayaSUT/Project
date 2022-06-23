import { Controller, Get, Post, Body, Patch, Param,Put, Delete } from '@nestjs/common';
import { CodeService } from './code.service';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import {
  HttpStatus,
  HttpException,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Code } from '@app/code/entities/code.entity';
import { catchError, map, Observable, of } from 'rxjs';


@Controller('code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  //สร้างข้อมูลในตาราง Code
  @Post()
  create(@Body() code: CreateCodeDto): Observable<Code> {
    return this.codeService.create(code).pipe(
      map((data: any) => data),
      catchError((err) => of({ error: err.message })),
    );
  }
 
//รับค่าด้วย id
  @Get(':id')
  findOne(@Param() params): Observable<Code> {
    return this.codeService.findOne(params.id);
  }
//รับช้อมูลทั้งหมด
  @Get()
  findAll(): Observable<Code[]> {
    return this.codeService.findAll();
  }

  //ลบทีละตัวด้วย id
  @Delete(':id')
  deleteOne(@Param('id') id: string): Observable<any> {
    return this.codeService.deleteOne(Number(id));
  }

  //อัปเดตข้อมูลด้วย id
  @Put(':id')
  updateOne(
    @Param('id') id: string,
    @Body() code: Code,
  ): Observable<any> {
    return this.codeService.updateOne(Number(id), code);
  }
}
