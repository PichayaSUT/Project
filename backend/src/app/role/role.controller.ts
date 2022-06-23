import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { catchError, map, Observable, of } from 'rxjs';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  create(@Body() role: Role): Observable<Role> {
    return this.roleService.create(role).pipe(
      map((data: any) => data),
      catchError((err) => of({ error: err.message })),
    );
  }

  @Get(':id')
  findOne(@Param() params): Observable<Role> {
    return this.roleService.findOne(params.id);
  }

  @Get()
  findAll(): Observable<Role[]> {
    return this.roleService.findAll();
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string): Observable<any> {
    return this.roleService.deleteOne(Number(id));
  }

  @Put(':id')
  updateOne(@Param('id') id: string, @Body() privilege: Role): Observable<any> {
    return this.roleService.updateOne(Number(id), privilege);
  }
}
