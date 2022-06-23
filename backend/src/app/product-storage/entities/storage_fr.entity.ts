

import { Column, Entity, PrimaryGeneratedColumn, ManyToOne,JoinColumn,OneToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '@common/BaseEntity';
import { ProductStorage } from './product-storage.entity';
@Entity('storage_fr')
export class StorageFr extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    note: string;

    @Column({ type: 'char', length: 1, comment: 'Y = yes, N = no, D = delete',nullable: true})
    status: string;

    
    //----------------------------------

    @OneToMany(() => ProductStorage, (product_storage) => product_storage.storage_fr)
    product_storage: ProductStorage[];

}