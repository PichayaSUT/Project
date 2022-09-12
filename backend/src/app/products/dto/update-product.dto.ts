import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateProductDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly id: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly barcode: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly quantity: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly priceForPrice: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly priceSell: number;
}
