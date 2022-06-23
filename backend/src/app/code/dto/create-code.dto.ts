import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@app/products/entities/product.entity';

export class CreateCodeDto {

@ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  jjCodeNumber: string;

  @ApiProperty()
  partNumber: string;
  


}
