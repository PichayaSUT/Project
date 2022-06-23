import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import {
  HttpStatus,
  HttpException,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrivilegeService } from './privilege.service';
import { Privilege } from '../privilege/entities/privilege.entity';
import { CreatePrivilegeDto } from './dto/create-privilege.dto';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';
import { catchError, map, Observable, of } from 'rxjs';
//import { number } from 'joi';

@Controller('/api/privilege')
export class PrivilegeController {
  constructor(private privilegeService: PrivilegeService) {}

  @Post()
  create(@Body() privilege: Privilege): Observable<Privilege> {
    return this.privilegeService.create(privilege).pipe(
      map((data: any) => data),
      catchError((err) => of({ error: err.message })),
    );
  }

  @Get(':id')
  findOne(@Param() params): Observable<Privilege> {
    return this.privilegeService.findOne(params.id);
  }

  @Get()
  findAll(): Observable<Privilege[]> {
    return this.privilegeService.findAll();
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string): Observable<any> {
    return this.privilegeService.deleteOne(Number(id));
  }

  @Put(':id')
  updateOne(
    @Param('id') id: string,
    @Body() privilege: Privilege,
  ): Observable<any> {
    return this.privilegeService.updateOne(Number(id), privilege);
  }

  /*@Get('all')
  async getAll():Promise<Privilege[]>{
      return await this.privilegeService.findAll();
  } */
  /* @Get()
  public async findAll(): Promise<Privilege[]> {
      return await this.privilegeService.findAll();
  }

  @Get('/:privilegeId')
  public async findOne(@Param('privilegeId') privilegeId: number): Promise<Privilege> {
      return await this.privilegeService.findOne(privilegeId);
  }

  @Post()
  public async create(
      @Body()  createPrivilegeDto:  CreatePrivilegeDto,
  ): Promise<Privilege> {
      return await this.privilegeService.create(createPrivilegeDto);
  }

  @Patch('/:privilegeId')
  public async update(
      @Body() updatePrivilegeDto: UpdatePrivilegeDto,
      @Param('privilegeId') privilegeId: number,
  ): Promise<Privilege> {
      const data = await this.privilegeService.update(
          privilegeId,
          UpdatePrivilegeDto,
      );
      return data;
  }

  @Delete('/:privilegeId')
  public async delete(@Param('privilegeId') privilegeId: number): Promise<void> {
      const data = await this.findOne(privilegeId);
      if (!data) {
          throw new NotFoundException(`PrivilAWDege #${data} not found`);
      }

      return await this.privilegeService.remove(privilegeId);
  }*/
}
