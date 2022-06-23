import { CreatePrivilegeDto } from './dto/create-privilege.dto';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';
import {
  HttpStatus,
  HttpException,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Privilege } from './entities/privilege.entity';
import { Role } from '../role/entities/role.entity';
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
export class PrivilegeService {
  constructor(
    @InjectRepository(Privilege)
    private readonly privilegeRepository: Repository<Privilege>,
  ) {}

  async all() {
    return this.privilegeRepository.find();
  }

  create(privilege: Privilege): Observable<Privilege> {
    //hardcode
    privilege.name = 'dddd';
    privilege.controller = 's';
    privilege.status = 'd';
    
    return from(this.privilegeRepository.save(privilege));
  }

  findOne(id: number): Observable<Privilege> {
    return from(this.privilegeRepository.findOne({ id }));
  }

  findAll(): Observable<Privilege[]> {
    return from(this.privilegeRepository.find());
  }

  deleteOne(id: number): Observable<any> {
    return from(this.privilegeRepository.delete(id));
  }

  updateOne(id: number, privilege: Privilege): Observable<any> {
    return from(this.privilegeRepository.update(id, privilege));
  }

  /* findAll(): Promise<Privilege[]> {
    return this.privilegeRepository.find();
  } */

  /* public async findAll(): Promise<Privilege[]> {
    return await this.privilegeRepository.findAll();
}

public async findOne(privilegeId: number): Promise<Privilege> {
    const privilege= await this.privilegeRepository.findById(privilegeId);
    if (!privilege) {
        throw new NotFoundException(`Privilege #${privilegeId} not found`);
    }
    return privilege;
}

public async create(
    createPrivilegeDto: CreatePrivilegeDto,
): Promise<Privilege> {
    try {
      return await this.privilegeRepository.createPrivilege(createPrivilegeDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
}

public async update(
    privilegeId: number,
    updatePrivilegeDto: UpdatePrivilegeDto,
): Promise<Privilege> {
    const product = await this.privilegeRepository.findOne( privilegeId);
    if (!product) {
        throw new NotFoundException(`Product #${ privilegeId} not found`);
    }
    return this.privilegeRepository.editPrivilege( privilegeId, updatePrivilegeDto);
}

public async remove(privilegeId: number): Promise<void> {
    await this.privilegeRepository.delete(privilegeId);
}
*/
}
