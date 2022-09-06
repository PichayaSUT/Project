import { BaseEntity } from '@common/BaseEntity';
import { IsPhoneNumber } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('customer')
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @PrimaryColumn()
  phone_number: string;

  @Column()
  @IsPhoneNumber('TH')
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  debt: number;

  @Column()
  credit: number;

}
