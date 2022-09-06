import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CreatePaymentDto {

  @IsNotEmpty()
  @ApiProperty()
  readonly id: string;

  @IsNotEmpty()
  @ApiProperty()
  discount: number;

  @IsNotEmpty()
  @ApiProperty()
  total: number;

  @IsNotEmpty()
  @ApiProperty()
  receive: number;

  @IsNotEmpty()
  @ApiProperty()
  payment_type: string;

  @IsNotEmpty()
  @ApiProperty()
  status: string;

  @IsNotEmpty()
  @ApiProperty()
  payment_path: string;

  @IsNotEmpty()
  @ApiProperty()
  employee: string;
  
  @IsNotEmpty()
  @ApiProperty()
  @IsPhoneNumber('TH')
  customer_phone_number: string;
}


