import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from 'src/app/role/entities/role.entity';
import { Employee } from 'src/app/employee/entities/employee.entity';
import { Privilege } from 'src/app/privilege/entities/privilege.entity';

export class CreateRoleDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly status: string;

  @ApiProperty()
  readonly order: number;

  @ApiProperty()
  readonly employee: Employee;
  
  @ApiProperty()
  readonly privilege: Privilege[];
}
