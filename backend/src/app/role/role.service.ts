import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {
  HttpStatus,
  HttpException,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { Employee } from '../employee/entities/employee.entity';
import { AuthService } from '../../auth/services/auth.service';
import {
  catchError,
  from,
  map,
  Observable,
  switchMap,
  throwError,
  find,
} from 'rxjs';
import { resolve } from 'path/posix';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async all() {
    return this.roleRepository.find();
  }

  create(role: Role): Observable<Role> {
    //hardcode

    role.name = 'dddd';
    role.status = 's';
    role.order = 1;
    role.employee = role.employee;
    role.createdBy = 'Janpen';

    return from(this.roleRepository.save(role));
  }

  findOne(id: number): Observable<Role> {
    return from(this.roleRepository.findOne({ id }));
  }

  findAll(): Observable<Role[]> {
    return from(this.roleRepository.find());
  }

  deleteOne(id: number): Observable<any> {
    return from(this.roleRepository.delete(id));
  }

  updateOne(id: number, role: Role): Observable<any> {
    return from(this.roleRepository.update(id, role));
  }
}
