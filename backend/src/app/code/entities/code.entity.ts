import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '@common/BaseEntity'
import { Product } from '@app/products/entities/product.entity';

@Entity('code')
export class Code extends BaseEntity {

    @PrimaryGeneratedColumn()
  id: number;

    @Column({nullable: true})
    jjCodeNumber: string;

    @Column({nullable: true})
    partNumber: string;

    @OneToOne(() => Product, (product) => product.code)
    product: Product;


}
