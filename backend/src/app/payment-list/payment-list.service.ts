import { Payment } from '@app/payment/entities/payment.entity';
import { PaymentService } from '@app/payment/payment.service';
import { ProductsService } from '@app/products/products.service';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { forkJoin, map } from 'rxjs';
import { Repository } from 'typeorm';
import { CreatePaymentListDto, PaymentListCreate } from './dto/create-payment-list.dto';
import { UpdatePaymentListDto } from './dto/update-payment-list.dto';
import { PaymentList } from './entities/payment-list.entity';

@Injectable()
export class PaymentListService {
  constructor(
    @InjectRepository(PaymentList)
    private readonly paymentListService: Repository<PaymentList>,

    /*     @Inject(ProductsService)
        private readonly productService: ProductsService,
    
        @Inject(Payment)
        private readonly paymentService: PaymentService */

  ) { }

  /* createPaymentList(createPaymentListDto: PaymentListCreate[], paymentId: string) {
    const product = []
    for (let i = 0; i < createPaymentListDto.length; i++) {
      product.push(this.productService.findOne(createPaymentListDto[0].barcode))
    }
    const payment = this.paymentService.findAll(paymentId)

    return forkJoin({
      productValue: product,
      paymentValue: payment,
    }).pipe(
      map(({ productValue, paymentValue }) => {
        const data = []
        for (let i = 0; i < createPaymentListDto.length; i++) {
          const obj = {
            productId: productValue.id,
            paymentId: paymentValue.id,
            quantity: createPaymentListDto[i].quantity,
            price_total: createPaymentListDto[i].priceSell
          }
          data.push(obj)
        }
        console.log(data);
      })
    )
  } */


  create(data: PaymentListCreate) {
    return this.paymentListService
      .createQueryBuilder()
      .insert()
      .into(PaymentList)
      .values([
        { payment: data.paymentId, product: data.productId, price_total: data.price_total, quantity: data.quantity }
      ])
      .execute();
  }

  findAll() {
    return `This action returns all paymentList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentList`;
  }

  update(id: number, updatePaymentListDto: UpdatePaymentListDto) {
    return `This action updates a #${id} paymentList`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentList`;
  }
}
