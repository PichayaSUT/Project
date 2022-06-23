import { Column, Entity, PrimaryGeneratedColumn, ManyToOne,JoinColumn,OneToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '@common/BaseEntity';
import { CategorySec } from './sub_category_sec.entity';
import { CategoryTh } from './sub_category_th.entity';
import { CategoryFr } from './sub_category_fr.entity';
@Entity('category')
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    note: string;

    @Column({ type: 'char', length: 1, comment: 'Y = yes, N = no, D = delete',nullable: true})
    status: string;

        //----------- ตาราง *** Category_Sec *** ----------- 
        @ManyToOne(() => CategorySec, (category_sec) => category_sec.category)
        category_sec: CategorySec;
    
        //----------- ตาราง *** Category_Fr *** ----------- 
        @ManyToOne(() => CategoryFr, (category_fr) => category_fr.category)
        category_fr: CategoryFr;
    
        //----------- ตาราง *** Category_Th *** ----------- 
        @ManyToOne(() => CategoryTh, (category_th) => category_th.category)
        category_th: CategoryTh;
}
