import { Injectable } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { Repository } from 'typeorm';
import {
  catchError,
  from,
  map,
  Observable,
  switchMap,
  throwError,
  find,
} from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from './entities/unit.entity';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
  ) {}

  async all() {
    return this.unitRepository.find();
  }

  create(unit: Unit): Observable<Unit> {


    return from(this.unitRepository.save(unit));
  }

  findOne(id: number): Observable<Unit> {
    return from(this.unitRepository.findOne({ id }));
  }

  findAll(): Observable<Unit[]> {
    return from(this.unitRepository.find());
  }

  deleteOne(id: number): Observable<any> {
    return from(this.unitRepository.delete(id));
  }

  updateOne(id: number, unit: Unit): Observable<any> {
    return from(this.unitRepository.update(id, unit));
  }

}
