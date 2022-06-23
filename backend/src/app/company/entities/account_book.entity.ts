import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from '@common/BaseEntity';
import { Bank } from '@app/bank/entities/bank.entity';
import { Company } from './company.entity';

@Entity('account_book')
export class AccountBook extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  account_no: string;

  @Column()
  account_name: string;

  @Column({ type: 'char', length: 1, comment: 'Y = yes, N = no, D = delete' })
  status: string;

  @OneToOne(() => Bank)
  @JoinColumn()
  bank_id: Bank;

  @ManyToOne(() => Company, (company) => company.accountBooks)
  company: Company;
}
