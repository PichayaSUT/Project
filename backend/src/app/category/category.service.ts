import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

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
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  
  async all() {
    return this.categoryRepository.find();
  }

  create(productstorage : Category ): Observable<Category > {


    return from(this.categoryRepository.save(productstorage ));
  }

  findOne(id: number): Observable<Category > {
    return from(this.categoryRepository.findOne({ id }));
  }

  findAll(): Observable<Category []> {
    return from(this.categoryRepository.find());
  }

  deleteOne(id: number): Observable<any> {
    return from(this.categoryRepository.delete(id));
  }

  updateOne(id: number, productstorage : Category ): Observable<any> {
    return from(this.categoryRepository.update(id, productstorage ));
  }
}
