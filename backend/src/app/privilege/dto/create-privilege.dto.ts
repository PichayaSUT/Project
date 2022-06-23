import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from 'src/app/role/entities/role.entity';

export class CreatePrivilegeDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly controller: string;

  @ApiProperty()
  readonly status: string;

  @ApiProperty()
  readonly role_id: Role;
}
