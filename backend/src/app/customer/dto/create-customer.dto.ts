import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CreateCustomerDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsPhoneNumber('TH')
  readonly phone_number: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly first_name: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly last_name: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly debt: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly credit: number;
}
