
import { Column, Entity, PrimaryGeneratedColumn, OneToOne,ManyToOne } from 'typeorm';
import { BaseEntity } from '@common/BaseEntity'
import { Product } from '@app/products/entities/product.entity';
import { ProductStorage } from '@app/product-storage/entities/product-storage.entity';
import { CarBrand } from '@app/car-brand/entities/car-brand.entity';
@Entity('detail')
export class Detail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  note: string;




  //----------- ตาราง *** Product_storage *** ----------- 
    @ManyToOne(() => ProductStorage, (product_storage) => product_storage.detail)
    product_storage: ProductStorage;

  //----------- ตาราง *** Product *** ----------- 
    @OneToOne(() => Product, (product) => product.detail)
    product: Product;

  //----------- ตาราง *** Car_brand *** ----------- 
    @ManyToOne(() => CarBrand, (carbrand) => carbrand.detail)
    carbrand: CarBrand;
 
}