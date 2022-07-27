import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Product_grade } from '@app/product-grade/entities/product-grade.entity';
import { Detail } from '@app/detail/entities/detail.entity';
import { ProductCompany } from '@app/product-company/entities/product-company.entity';
import { Code } from '@app/code/entities/code.entity';
import { Unit } from '@app/unit/entities/unit.entity';

export class CreateProductDto {


  @IsNotEmpty()
  @ApiProperty()
  readonly id: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty()
  price_sell: number;

  @IsNotEmpty()
  @ApiProperty()
  limit_amount: number;

  @IsNotEmpty()
  @ApiProperty()
  amount: number;

  @IsNotEmpty()
  @ApiProperty()
  status: string;


  @IsNotEmpty()
  @ApiProperty()
  detail: Detail;

  @IsNotEmpty()
  @ApiProperty()
  readonly code_id: number;

  @IsNotEmpty()
  @ApiProperty()
  unit: Unit;

  @IsNotEmpty()
  @ApiProperty()
  readonly product_companys_id: number;






}
