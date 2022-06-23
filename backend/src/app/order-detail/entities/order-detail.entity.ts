
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne,JoinColumn,OneToOne } from 'typeorm';
import { BaseEntity } from '@common/BaseEntity';
import { Unit } from '@app/unit/entities/unit.entity';
import { ProductOrder } from '@app/product-order/entities/product-order.entity';
@Entity('order_detail')
export class OrderDetail extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product_company_name: string;

    @Column()
    amount_order: number;

    @Column()
    amount_real: number;

    @Column()
    purchase_price: number;

    //-------------------** Unit **  --------------------
    
    @ManyToOne(() => Unit, (unit) => unit.orderdetails)
    unit: Unit;

    //-------------------** Product Order **  --------------------
    
    @ManyToOne(() => ProductOrder, (product_order) => product_order.orderdetails)
    product_orders: ProductOrder;
}
