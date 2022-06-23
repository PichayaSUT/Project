import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '@common/BaseEntity';

@Entity('bank')
export class Bank extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name_th: string;

  @Column()
  name_en: string;

  @Column()
  order_on: number;

  @Column()
  status: string;
}
