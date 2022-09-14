import { PartialType } from '@nestjs/swagger';
import { CreatePaymentListDto } from './create-payment-list.dto';

export class UpdatePaymentListDto extends PartialType(CreatePaymentListDto) {}
