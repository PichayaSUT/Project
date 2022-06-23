
import {
  HttpStatus,
  HttpException,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Detail } from '@app/detail/entities/detail.entity';

import {
  catchError,
  from,
  map,
  Observable,
  switchMap,
  throwError,
  find,
} from 'rxjs';
import { resolve } from 'path/posix';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DetailService {
  constructor(
    @InjectRepository(Detail)
    private readonly detailRepository: Repository<Detail>,
  ) {}

  async all() {
    return this.detailRepository.find();
  }

  create(detail: Detail): Observable<Detail> {


    return from(this.detailRepository.save(detail));
  }

  findOne(id: number): Observable<Detail> {
    return from(this.detailRepository.findOne({ id }));
  }

  findAll(): Observable<Detail[]> {
    return from(this.detailRepository.find());
  }

  deleteOne(id: number): Observable<any> {
    return from(this.detailRepository.delete(id));
  }

  updateOne(id: number, detail: Detail): Observable<any> {
    return from(this.detailRepository.update(id, detail));
  }

}
