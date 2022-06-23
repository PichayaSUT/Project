import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetail } from './entities/order-detail.entity';
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

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly OrderDetailRepository: Repository<OrderDetail>,
  ) {}

  async all() {
    return this.OrderDetailRepository.find();
  }

  create(productcompany:OrderDetail): Observable<OrderDetail> {
    return from(this.OrderDetailRepository.save(productcompany));
  }

  findOne(id: number): Observable<OrderDetail> {
    return from(this.OrderDetailRepository.findOne({ id }));
  }

  findAll(): Observable<OrderDetail[]> {
    return from(this.OrderDetailRepository.find());
  }

  deleteOne(id: number): Observable<any> {
    return from(this.OrderDetailRepository.delete(id));
  }

  updateOne(id: number, productcompany: OrderDetail): Observable<any> {
    return from(this.OrderDetailRepository.update(id, productcompany));
  }
}
