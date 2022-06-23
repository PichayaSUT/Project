import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '@common/BaseEntity';
import { Address } from './address.entity';

@Entity('district')
export class District extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  province_id: number;

  @Column()
  code: string;

  @Column()
  name_th: string;

  @Column()
  name_en: string;

  @Column({ type: 'char', length: 1, comment: 'Y = yes, N = no, D = delete' })
  status: string;

  @OneToMany(() => Address, (address) => address.district)
  address: Address[];
}
