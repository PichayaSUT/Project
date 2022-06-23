import { Controller, Get, Post, Body, Patch, Param,Put, Delete } from '@nestjs/common';
import { CarBrandService } from './car-brand.service';
import { CreateCarBrandDto } from './dto/create-car-brand.dto';
import { UpdateCarBrandDto } from './dto/update-car-brand.dto';
import { CarBrand } from './entities/car-brand.entity';
import { catchError, map, Observable, of } from 'rxjs';

@Controller('car-brand')
export class CarBrandController {
  constructor(private readonly carBrandService: CarBrandService) {}

  //สร้างข้อมูลในตาราง Car Brand
  @Post()
  create(@Body() carbrand: CarBrand): Observable<CarBrand> {
    return this.carBrandService.create(carbrand).pipe(
      map((data: any) => data),
      catchError((err) => of({ error: err.message })),
    );
  }
 
//รับค่าด้วย id
  @Get(':id')
  findOne(@Param() params): Observable<CarBrand> {
    return this.carBrandService.findOne(params.id);
  }
//รับช้อมูลทั้งหมด
  @Get()
  findAll(): Observable<CarBrand[]> {
    return this.carBrandService.findAll();
  }

  //ลบทีละตัวด้วย id
  @Delete(':id')
  deleteOne(@Param('id') id: string): Observable<any> {
    return this.carBrandService.deleteOne(Number(id));
  }

  //อัปเดตข้อมูลด้วย id
  @Put(':id')
  updateOne(
    @Param('id') id: string,
    @Body() carbrand: CarBrand,
  ): Observable<any> {
    return this.carBrandService.updateOne(Number(id), carbrand);
  }
}
