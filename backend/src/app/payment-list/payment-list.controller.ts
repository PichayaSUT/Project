import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentListService } from './payment-list.service';
import { CreatePaymentListDto, PaymentListCreate } from './dto/create-payment-list.dto';
import { UpdatePaymentListDto } from './dto/update-payment-list.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Payment-list')
@Controller('payment-list')
export class PaymentListController {
  constructor(private readonly paymentListService: PaymentListService) {}

  @Post()
  create(@Body() createPaymentListDto: PaymentListCreate) {
    return this.paymentListService.create(createPaymentListDto);
  }

  @Get()
  findAll() {
    return this.paymentListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentListDto: UpdatePaymentListDto) {
    return this.paymentListService.update(+id, updatePaymentListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentListService.remove(+id);
  }
}
