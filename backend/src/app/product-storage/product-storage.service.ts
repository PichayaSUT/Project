
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
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductStorage } from './entities/product-storage.entity';

@Injectable()
export class ProductStorageService {

  constructor(
    @InjectRepository(ProductStorage)
    private readonly productstorageRepository: Repository<ProductStorage>,
  ) {}

  async all() {
    return this.productstorageRepository.find();
  }

  create(productstorage : ProductStorage ): Observable<ProductStorage > {


    return from(this.productstorageRepository.save(productstorage ));
  }

  findOne(id: number): Observable<ProductStorage > {
    return from(this.productstorageRepository.findOne({ id }));
  }

  findAll(): Observable<ProductStorage []> {
    return from(this.productstorageRepository.find());
  }

  deleteOne(id: number): Observable<any> {
    return from(this.productstorageRepository.delete(id));
  }

  updateOne(id: number, productstorage : ProductStorage ): Observable<any> {
    return from(this.productstorageRepository.update(id, productstorage ));
  }

}
