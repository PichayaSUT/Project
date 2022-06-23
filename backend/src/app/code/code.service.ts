import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import {
  HttpStatus,
  HttpException,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
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
import { Repository } from 'typeorm';
import { Code } from '@app/code/entities/code.entity';

@Injectable()
export class CodeService {
  constructor(
    @InjectRepository(Code)
    private readonly codeRepository: Repository<Code>,
  ) {}

  async all() {
    return this.codeRepository.find();
  }

  create(Code: CreateCodeDto): Observable<Code> {
    return from(this.codeRepository.save(Code));
  }

  findOne(id: number): Observable<Code> {
    return from(this.codeRepository.findOne({ id }));
  }

  findAll(): Observable<Code[]> {
    return from(this.codeRepository.createQueryBuilder("code").leftJoinAndSelect("code.product","product").getMany());
  }

  deleteOne(id: number): Observable<any> {
    return from(this.codeRepository.delete(id));
  }

  updateOne(id: number, Code: Code): Observable<any> {
    return from(this.codeRepository.update(id, Code));
  }

}
