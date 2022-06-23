
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne,JoinColumn,OneToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '@common/BaseEntity';
import { StorageTh } from './storage_th.entity';
import { StorageFr } from './storage_fr.entity';
import { StorageSec } from './storage_sec.entity';
import { Detail } from '@app/detail/entities/detail.entity';

@Entity('product_storage')
export class ProductStorage extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    note: string;

    @Column({ type: 'char', length: 1, comment: 'Y = yes, N = no, D = delete',nullable: true})
    status: string;

    //----------- ตาราง *** Storage_Th *** ----------- 
    @ManyToOne(() => StorageTh, (storage_th) => storage_th.product_storage)
    storage_th: StorageTh;

    //----------- ตาราง *** Storage_Fr *** ----------- 
    @ManyToOne(() => StorageFr, (storage_fr) => storage_fr.product_storage)
    storage_fr: StorageFr;

    //----------- ตาราง *** Storage_Sec *** ----------- 
    @ManyToOne(() => StorageSec, (storage_sec) => storage_sec.product_storage)
    storage_sec: StorageSec;

    //----------- ตาราง *** Detail *** ----------- 
    @OneToOne(() => Detail, (detail) => detail.product_storage)
    detail: Detail;
}
