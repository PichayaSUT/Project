import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '@common/BaseEntity';
import { IsPhoneNumber } from 'class-validator';
import { Company } from './company.entity';

@Entity('dealer')
export class Dealer extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  @IsPhoneNumber('TH')
  phone: string;

  @Column()
  line: string;

  @Column({ type: 'char', length: 1, comment: 'Y = yes, N = no, D = delete' })
  status: string;

  @ManyToOne(() => Company, (company) => company.dealers)
  company: Company;
}
