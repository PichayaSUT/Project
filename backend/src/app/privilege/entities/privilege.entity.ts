/**
 * เป็นการบอกว่า role มีสิทธิ์ใช้งานหน้าไหน
 */
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@common/BaseEntity';
import { Role } from '@app/role/entities/role.entity';

@Entity('privilege')
export class Privilege extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  controller: string;

  @Column({ type: 'char', length: 1, comment: 'Y = yes, N = no, D = delete' })
  status: string;

  @ManyToOne(() => Role, (role_id) => role_id.privileges)
  role_id: Role;
}
