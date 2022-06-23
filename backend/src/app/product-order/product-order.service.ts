import { Injectable } from '@nestjs/common';
import { CreateProductOrderDto } from './dto/create-product-order.dto';
import { UpdateProductOrderDto } from './dto/update-product-order.dto';
import { ProductOrder } from './entities/product-order.entity';
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

@Injectable()
export class ProductOrderService {

  constructor(
    @InjectRepository(ProductOrder)
    private readonly ProductOrderRepository: Repository<ProductOrder>,
  ) {}

  async all() {
    return this.ProductOrderRepository.find();
  }

  create(productcompany:ProductOrder): Observable<ProductOrder> {
    return from(this.ProductOrderRepository.save(productcompany));
  }

  findOne(id: number): Observable<ProductOrder> {
    return from(this.ProductOrderRepository.findOne({ id }));
  }

  findAll(): Observable<ProductOrder[]> {
    return from(this.ProductOrderRepository.find());
  }

  deleteOne(id: number): Observable<any> {
    return from(this.ProductOrderRepository.delete(id));
  }

  updateOne(id: number, productcompany: ProductOrder): Observable<any> {
    return from(this.ProductOrderRepository.update(id, productcompany));
  }
}
