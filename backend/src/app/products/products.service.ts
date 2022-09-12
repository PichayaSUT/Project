
import {
  HttpStatus,
  HttpException,
  Injectable,
  Inject,
} from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductCompanyService } from '@app/product-company/product-company.service';
import { CodeService } from '@app/code/code.service';
import {
  from,
  map,
  Observable,
  forkJoin,
} from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @Inject(ProductCompanyService)
    private readonly productCompanyService: ProductCompanyService,

    @Inject(CodeService)
    private readonly codeService: CodeService,

  ) { }

  async all() {
    return this.productRepository.find();
  }

  /*create(product: CreateProductDto): Observable<Product> {
    return from(this.productRepository.save(product));
  }
  */

  findOne(id: number): Observable<Product> {
    return from(this.productRepository.createQueryBuilder("product").leftJoinAndSelect("product.code", "code").where("code.jjCodeNumber = :id", { id }).getOne())
  }

  /* findAll(): Observable<Product[]> {
    return from(this.productRepository.createQueryBuilder("product").leftJoinAndSelect("product.product_companys","product_companys").leftJoinAndSelect("product.code","code").getMany());
  } */

  findPartID(id: string): Observable<Product[]> {
    return from(this.productRepository.createQueryBuilder("product").where("product.name").getMany())
  }
  findName(name: string): Observable<Product[]> {
    return from(this.productRepository.createQueryBuilder("product").leftJoinAndSelect("product.code", "code").where("product.name like :name", { name: '%' + name + '%' }).getMany())
  }

  deleteOne(id: number): Observable<any> {
    return from(this.productRepository.delete(id));
  }

  updateOne(id: number, product: Product): Observable<any> {
    return from(this.productRepository.update(id, product));
  }

  createProduct(product: CreateProductDto): Observable<any> {
    let newproducts: Product;
    const { product_companys_id } =
      product;
    //  const DetailExist =
    //  this.DetailService.findOne(detail);
    // const CodeExist =
    //  this.codeService.findOne(code_id);
    const ProductCompanyExist =
      this.productCompanyService.findOne(product_companys_id);
    // const UnitExist =
    //this.UnitService.findOne(unit);
    return forkJoin({
      //   DetailValue: DetailExist,
      //   CodeValue: CodeExist,
      ProductCompanyValue: ProductCompanyExist,
      //UnitValue: UnitExist,
    }).pipe(
      map(({ ProductCompanyValue }) => {
        if (ProductCompanyValue) {
          newproducts = new Product();
          newproducts.product_companys = ProductCompanyValue;
          //newproducts.code = CodeValue;
          newproducts.limit_amount = product?.limit_amount;
          newproducts.amount = product?.amount;
          newproducts.name = product?.name;
          newproducts.price_sell = product?.price_sell;
          newproducts.status = product?.status;

          this.productRepository.save(newproducts).then((res) => {
            console.log(res);
            if (!res) {
              throw new HttpException(
                'can not save category',
                HttpStatus.BAD_REQUEST,
              );
            }
          });
          return newproducts;
        } else {
          throw new HttpException(
            'product  not found',
            HttpStatus.NOT_FOUND,
          );
        }
      }),
    );
  }

  updateByPayment(product: UpdateProductDto): Promise<UpdateResult> {
    console.log(product);
    return this.productRepository
      .createQueryBuilder()
      .update(Product)
      .set({ amount: () => "amount - " + product.quantity, })
      .where("name = :name", { name: product.name })
      .execute();
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
function id(id: any) {
  throw new Error('Function not implemented.');
}

