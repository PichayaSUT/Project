import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';

import { CreateEmployeeDto, UpdateEmployeeDto, LoginEmployeeDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { catchError, map, Observable, of } from 'rxjs';
/**
 * auth
 */
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { Modules } from 'src/auth/decorators/modules.decorator';
import { ModulesAllowed } from './../../auth/models/role.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';

@ApiTags('employee')
@Controller('employee')
@Modules(ModulesAllowed.EMPLOYEE)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // @Post()
  // create(@Body() createEmployeeDto: CreateEmployeeDto) {
  //   return this.employeeService.createEmployee(createEmployeeDto);
  // }

  @Post()
  create(@Body() user: CreateEmployeeDto): Observable<any> {
    return this.employeeService.create(user).pipe(
      map((user: any) => user),
      catchError((err) => of({ error: err.message })),
    );
  }

  @Post('login')
  login(@Body() user: LoginEmployeeDto): Observable<object> {
    return this.employeeService.login(user).pipe(
      map((jwt: string) => {
        return { access_token: jwt };
      }),
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('')
  test() {
    return 'success';
  }
  // @Get()
  // findAll() {
  //   return this.employeeService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.employeeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateEmployeeDto: UpdateEmployeeDto,
  // ) {
  //   return this.employeeService.update(+id, updateEmployeeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.employeeService.remove(+id);
  // }
}
