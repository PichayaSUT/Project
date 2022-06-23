
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne,JoinColumn,OneToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '@common/BaseEntity';
import { OrderDetail } from '@app/order-detail/entities/order-detail.entity';
@Entity('product_order')
export class ProductOrder extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nobill: number;
    
    @Column({ type: 'char', length: 1, comment: 'Y = yes, N = no, D = delete',nullable: true})
    status: string;

    //-----------------------** Order Detail  **---------------------------

    @OneToMany(() => OrderDetail, (orderdetail) => orderdetail.product_orders)
    orderdetails: OrderDetail[];
}
