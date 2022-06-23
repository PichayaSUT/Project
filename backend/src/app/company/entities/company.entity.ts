import { BaseEntity } from '@common/BaseEntity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Dealer } from './dealer.entity';
import { AccountBook } from './account_book.entity';
import { IsEmail, IsPhoneNumber } from 'class-validator';

@Entity('company')
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name_th: string;

  @Column()
  name_en: string;

  @Column()
  initial: string;

  @Column()
  @IsPhoneNumber('TH')
  phone: string;

  @Column()
  line: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ type: 'char', length: 1, comment: 'Y = yes, N = no, D = delete' })
  status: string;

  @OneToMany(() => Dealer, (dealer) => dealer.company)
  dealers: Dealer[];

  @OneToMany(() => AccountBook, (accountBook) => accountBook.company)
  accountBooks: AccountBook[];
}
