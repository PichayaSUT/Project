import { IsEmail, IsPhoneNumber } from 'class-validator';
import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '@common/BaseEntity';
import { Role } from '@app/role/entities/role.entity';

@Entity('employee')
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  nickname: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column()
  @IsPhoneNumber('TH')
  phone: string;

  @Column({ type: 'char', length: 1, comment: 'Y = yes, N = no, D = delete' })
  status: string;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @OneToOne(() => Role, (role) => role.employee)
  role: Role;
}
