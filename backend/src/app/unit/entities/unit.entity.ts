
import { Column, Entity, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import { BaseEntity } from '@common/BaseEntity'
import { Product } from '@app/products/entities/product.entity';
import { OrderDetail } from '@app/order-detail/entities/order-detail.entity';
@Entity('unit')
export class Unit extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    name: string;

    @Column({ type: 'char', length: 1, comment: 'Y = yes, N = no, D = delete',nullable: true})
    status: string;


   //-----------------------**  Unit  ** 1 ต่อ หลาย---------------------------
    
    @OneToMany(() => Product, (product) => product.unit)
    products: Product[];

    //-----------------------** Order Detail  ** 1 ต่อ หลาย---------------------------
    @OneToMany(() => OrderDetail, (orderdetail) => orderdetail.unit)
    orderdetails: OrderDetail[];



}
