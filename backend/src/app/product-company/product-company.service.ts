import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductCompanyDto } from './dto/create-product-company.dto';
import { UpdateProductCompanyDto } from './dto/update-product-company.dto';
import { ProductCompany } from './entities/product-company.entity';

import {
  catchError,
  from,
  map,
  Observable,
  switchMap,
  throwError,
  find,
} from 'rxjs';
import { Repository } from 'typeorm';


@Injectable()
export class ProductCompanyService {
  constructor(
    @InjectRepository(ProductCompany)
    private readonly ProductCompanyRepository: Repository<ProductCompany>,
  ) { }

  async all() {
    return this.ProductCompanyRepository.find();
  }

  create(productcompany: CreateProductCompanyDto): Observable<ProductCompany> {
    return from(this.ProductCompanyRepository.save(productcompany));
  }

  findOne(id: number): Observable<ProductCompany> {
    return from(this.ProductCompanyRepository.findOne({ id }));
  }

  findAll(): Observable<ProductCompany[]> {
    return from(this.ProductCompanyRepository.createQueryBuilder("product_company").leftJoinAndSelect("product_company.products","products").getMany());
    //return from(this.ProductCompanyRepository.find({ relations: { products: true } }));
  }

  deleteOne(id: number): Observable<any> {
    return from(this.ProductCompanyRepository.delete(id));
  }

  updateOne(id: number, productcompany: ProductCompany): Observable<any> {
    return from(this.ProductCompanyRepository.update(id, productcompany));
  }
  /*
  createProductCategory(categoryDto: CreateCategoryDto): Observable<Category> {
    let category: Category;
    const { sub_category_th_id, sub_category_fr_id, sub_category_sec_id } =
      categoryDto;
    const SubcategoryFrExist =
      this.subCategoryFrService.findOne(sub_category_fr_id);
    const SubcategorySecExist =
      this.subCategorySecService.findOne(sub_category_sec_id);
    const SubcategoryThExist =
      this.subCategoryThService.findOne(sub_category_th_id);
    return forkJoin({
      SubcategoryFrValue: SubcategoryFrExist,
      SubcategorySecValue: SubcategorySecExist,
      SubcategoryThValue: SubcategoryThExist,
    }).pipe(
      map(({ SubcategoryFrValue, SubcategorySecValue, SubcategoryThValue }) => {
        if (SubcategoryFrValue && SubcategorySecValue && SubcategoryThValue) {
          category = new Category();
          category.category_fr = SubcategoryFrValue;
          category.category_sec = SubcategorySecValue;
          category.category_th = SubcategoryThValue;
          category.status = Status.YES;
          category.note = categoryDto?.note;
          this.categoryRepository.save(category).then((res) => {
            console.log(res);
            if (!res) {
              throw new HttpException(
                'can not save category',
                HttpStatus.BAD_REQUEST,
              );
            }
          });
          return category;
        } else {
          throw new HttpException(
            'product subcategory not found',
            HttpStatus.NOT_FOUND,
          );
        }
      }),
    );
  }

*/

}
