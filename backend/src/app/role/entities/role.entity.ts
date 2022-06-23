/**
 * เป็น Role ของผู้ใช้งาน
 */
import { IsNegative } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '@common/BaseEntity';
import { Employee } from '@app/employee/entities/employee.entity';
import { Privilege } from '@app/privilege/entities/privilege.entity';

@Entity('role')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'char', length: 1, comment: 'Y = yes, N = no, D = delete' })
  status: string;

  @Column({ nullable: true })
  @IsNegative()
  order: number;

  @OneToOne(() => Employee)
  @JoinColumn()
  employee: Employee;

  @OneToMany(() => Privilege, (privilege) => privilege.role_id)
  privileges: Privilege[];
}
