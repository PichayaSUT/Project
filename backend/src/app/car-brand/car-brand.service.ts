import { CreateCarBrandDto } from './dto/create-car-brand.dto';
import { UpdateCarBrandDto } from './dto/update-car-brand.dto';
import { Repository } from 'typeorm';
import { CarBrand } from './entities/car-brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  HttpStatus,
  HttpException,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import {
  catchError,
  from,
  map,
  Observable,
  switchMap,
  throwError,
  find,
} from 'rxjs';

@Injectable()
export class CarBrandService {
  constructor(
    @InjectRepository(CarBrand)
    private readonly carbrandRepository: Repository<CarBrand>,
  ) {}

  async all() {
    return this.carbrandRepository.find();
  }

  create(detail: CarBrand): Observable<CarBrand> {


    return from(this.carbrandRepository.save(detail));
  }

  findOne(id: number): Observable<CarBrand> {
    return from(this.carbrandRepository.findOne({ id }));
  }

  findAll(): Observable<CarBrand[]> {
    return from(this.carbrandRepository.find());
  }

  deleteOne(id: number): Observable<any> {
    return from(this.carbrandRepository.delete(id));
  }

  updateOne(id: number, detail: CarBrand): Observable<any> {
    return from(this.carbrandRepository.update(id, detail));
  }
}
