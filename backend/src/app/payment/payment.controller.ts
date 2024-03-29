import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto, SavePayment } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post('/savePayment')
  createPaymentJson(@Body() data: SavePayment) {
    return this.paymentService.createPaymentList(data)
    //return this.paymentService.createPaymentJson(data)
  }

  @Post()
  create(@Body() data: SavePayment) {
    return this.paymentService.create(data);
  }

  @Get('/all/:phoneNumber')
  findAll(@Param('phoneNumber') phoneNumber: string) {
    return this.paymentService.findAll(phoneNumber);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
