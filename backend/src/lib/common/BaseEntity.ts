import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true, length: 100 })
  createdBy: string;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @Column({ nullable: true, length: 100 })
  updatedBy?: string;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
