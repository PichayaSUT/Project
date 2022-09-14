import { Payment } from "@app/payment/entities/payment.entity";
import { Product } from "@app/products/entities/product.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePaymentListDto {

  @IsNotEmpty()
  @ApiProperty()
  readonly quantity: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly price_total: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly paymentId: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly productId: number;

}

export class PaymentListCreate {

  @IsNotEmpty()
  @ApiProperty()
  quantity: number

  @IsNotEmpty()
  @ApiProperty()
  paymentId: Payment

  @IsNotEmpty()
  @ApiProperty()
  productId: Product

  @IsNotEmpty()
  @ApiProperty()
  price_total: number

}