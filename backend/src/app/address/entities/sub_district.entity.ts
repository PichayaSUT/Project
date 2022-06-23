import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Address } from './address.entity';
import { BaseEntity } from '@common/BaseEntity';

@Entity('sub_district')
export class SubDistrict extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  district_id: number;

  @Column()
  code: string;

  @Column()
  name_th: string;

  @Column()
  name_en: string;

  @Column()
  postcode: string;

  @Column()
  lat: string;

  @Column()
  lng: string;

  @Column()
  status: string;

  @OneToMany(() => Address, (address) => address.subDistrictId)
  address: Address[];
}
