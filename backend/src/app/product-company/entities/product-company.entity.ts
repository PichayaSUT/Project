
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne,JoinColumn,OneToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '@common/BaseEntity'
import { Product } from '@app/products/entities/product.entity';
@Entity('product_company')
export class ProductCompany extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_company_name: string;

  @Column()
  code: string;

  @Column({nullable: true})
  note: string;

  @Column({ type: 'char', length: 1, comment: 'Y = yes, N = no, D = delete',nullable: true})
  status: string;

   
  @OneToMany(() => Product, (products) => products.product_companys)
  products: Product[];

}
