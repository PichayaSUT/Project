import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CreatePaymentDto {

  @IsNotEmpty()
  @ApiProperty()
  readonly paymentId: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly discount: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly total: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly receive: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly paymentType: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly paymentStatus: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly paymentPath: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly employeeEmail: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsPhoneNumber('TH')
  readonly customerPhone: string;
}

export class SavePayment {
  @IsNotEmpty()
  @ApiProperty()
  paymentId: string;
  @IsNotEmpty()
  @ApiProperty()
  customer: { name: string, phone: string };
  @IsNotEmpty()
  @ApiProperty()
  employee: { name: string, email: string };
  @IsNotEmpty()
  @ApiProperty()
  list: any[];
  @IsNotEmpty()
  @ApiProperty()
  total: number;
  @IsNotEmpty()
  @ApiProperty()
  discount: number;
  @IsNotEmpty()
  @ApiProperty()
  receive: number;
  @IsNotEmpty()
  @ApiProperty()
  paymentType: string;
  @IsNotEmpty()
  @ApiProperty()
  paymentStatus: string
}

