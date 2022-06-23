import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '@common/BaseEntity';
import { District } from './district.entity';
import { Province } from './province.entity';
import { SubDistrict } from './sub_district.entity';

@Entity('address')
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  address: string;

  @Column()
  status: string;

  @Column()
  district: string;

  @Column()
  province: string;

  @Column()
  postcode: string;

  @ManyToOne(() => District, (district) => district.address)
  @JoinColumn({ name: 'district_id' })
  districtId: District;

  @ManyToOne(() => Province, (province) => province.address)
  @JoinColumn({ name: 'province_id' })
  provinceId: Province;

  @ManyToOne(() => SubDistrict, (subDistrict) => subDistrict.address)
  @JoinColumn({ name: 'sub_district_id' })
  subDistrictId: SubDistrict;
}
