import { BaseEntity } from '@common/BaseEntity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('region')
export class Region extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column()
  name_th: string;

  @Column()
  name_en: string;

  @Column({ type: 'char', length: 1, comment: 'Y = yes, N = no, D = delete' })
  status: string;
}
