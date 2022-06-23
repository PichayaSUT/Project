import { BaseEntity } from '@common/BaseEntity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Address } from './address.entity';

@Entity('province')
export class Province extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  region_id: number;

  @Column()
  code: string;

  @Column()
  name_th: string;

  @Column()
  name_en: string;

  @Column({ type: 'char', length: 1, comment: 'Y = yes, N = no, D = delete' })
  status: string;

  @OneToMany(() => Address, (address) => address.province)
  address: Address[];
}
