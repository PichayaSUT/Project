import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductGradeDto } from './dto/create-product-grade.dto';
import { UpdateProductGradeDto } from './dto/update-product-grade.dto';
import { Product_grade } from './entities/product-grade.entity';
import {
  catchError,
  from,
  map,
  Observable,
  switchMap,
  throwError,
  find,
} from 'rxjs';

@Injectable()
export class ProductGradeService {
  constructor(
    @InjectRepository(Product_grade)
    private readonly ProductGradeRepository: Repository<Product_grade>,
  ) {}

  async all() {
    return this.ProductGradeRepository.find();
  }

  create(productgrade:Product_grade): Observable<Product_grade> {
    
    /*//Test Hardcode
    product.name= 'something';
    product.amount= 22;
    product.limit_amount=1500;
    product.price_sell=250;
    product.status= 'empty'; */

    return from(this.ProductGradeRepository.save(productgrade));
  }

  findOne(id: number): Observable<Product_grade> {
    return from(this.ProductGradeRepository.findOne({ id }));
  }

  findAll(): Observable<Product_grade[]> {
    return from(this.ProductGradeRepository.find());
  }

  deleteOne(id: number): Observable<any> {
    return from(this.ProductGradeRepository.delete(id));
  }

  updateOne(id: number, productgrade: Product_grade): Observable<any> {
    return from(this.ProductGradeRepository.update(id, productgrade));
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
