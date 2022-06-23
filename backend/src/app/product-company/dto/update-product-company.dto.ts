import { PartialType } from '@nestjs/mapped-types';
import { CreateProductCompanyDto } from './create-product-company.dto';

export class UpdateProductCompanyDto extends PartialType(CreateProductCompanyDto) {}
