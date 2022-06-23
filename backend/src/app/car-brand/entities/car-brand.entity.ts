import { Column, Entity, PrimaryGeneratedColumn, ManyToOne,JoinColumn,OneToOne,OneToMany } from 'typeorm';
import { BaseEntity } from '@common/BaseEntity'
import { Detail } from '@app/detail/entities/detail.entity';
import { CarModel } from './car-model.entity';
@Entity('car_brand')
export class CarBrand extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column({ type: 'char', length: 1, comment: 'Y = yes, N = no, D = delete'})
  status: string;

//----------- ตาราง *** Detail *** ----------- 
  @OneToMany(() => Detail, (detail) => detail.carbrand)
  detail: Detail[];

//----------- ตาราง *** Car_model *** ----------- 
  @OneToMany(() => CarModel, (carmodel) => carmodel.carbrand)
  carmodel: CarModel[];
}
