
import { Column, Entity, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import { BaseEntity } from '@common/BaseEntity'
import { Product } from '@app/products/entities/product.entity';

@Entity('product_grade')
export class Product_grade extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  name: string;

  @Column({nullable: true})
  note: string;

  @OneToMany(() => Product, (product) => product.product_grade_id)
  products: Product[];
 
}
