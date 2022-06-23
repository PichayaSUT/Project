import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly first_name: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly last_name: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly phone: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly nickname: string;
}
