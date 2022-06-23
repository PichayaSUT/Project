

import { Column, Entity, PrimaryGeneratedColumn, ManyToOne,JoinColumn,OneToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '@common/BaseEntity';
import { Category } from './category.entity';

@Entity('sub_category_fr')
export class CategoryFr extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    note: string;

    @Column({ type: 'char', length: 1, comment: 'Y = yes, N = no, D = delete',nullable: true})
    status: string;

         //----------------------------------

         @OneToMany(() => Category, (category) => category.category_fr)
         category: Category[];
}