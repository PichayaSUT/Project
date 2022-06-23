import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductCompanyDto {

    @IsNotEmpty()
    @ApiProperty()
    readonly product_company_name: string;

    @IsNotEmpty()
    @ApiProperty()
    readonly code: string;

    @IsNotEmpty()
    @ApiProperty()
    readonly note: string;

    @IsNotEmpty()
    @ApiProperty()
    readonly status: string;
 
}
