import { Employee } from './../../employee/entities/employee.entity';
import { BaseEntity, Entity, OneToMany, PrimaryColumn } from "typeorm";


@Entity('payment')
export class Payment extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => Employee, (employee) => employee.id)
  employee : Employee[]
}
