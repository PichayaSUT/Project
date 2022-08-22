import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePaymentDto {

  @IsNotEmpty()
  @ApiProperty()
  readonly id: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly receipt_number: string;

  @IsNotEmpty()
  @ApiProperty()
  total: number;

}


