
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne,JoinColumn,OneToOne,OneToMany } from 'typeorm';
import { BaseEntity } from '@common/BaseEntity'
import { Product_grade } from '@app/product-grade/entities/product-grade.entity';
import { Detail } from '@app/detail/entities/detail.entity';
import { ProductCompany } from '@app/product-company/entities/product-company.entity';
import { Code } from '@app/code/entities/code.entity';
import { Unit } from '@app/unit/entities/unit.entity';

@Entity('product')
export class Product extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price_sell: number;

  @Column()
  limit_amount: number;  
  //จำเป็นต้องซื้อในจำนวนเท่านี้ ๆ สินค้าเหลือเท่าไหร่ถึงจำเป็นต้องสั่ง ex ถ้าเมื่อไหร่เหลือในเกณฑ์ที่กำหนด (เป็นตัวแดง) แล้วให้สั่ง 
  //เขียน alert 
  @Column()
  amount: number;

  @Column({ type: 'char', length: 1, comment: 'Y = yes, N = no, D = delete',nullable: true})
  status: string;

  //--------------------------------------------------

  //------ Join ตาราง ****Detail***** 1 ต่อ 1 
    @OneToOne(() => Detail, detail => detail.product) 
    @JoinColumn()
    detail: Detail;

  //------ Join ตาราง ****Code***** 1 ต่อ 1 
    @OneToOne(() => Code, code => code.product) 
    @JoinColumn()
    code: Code;

  //----------- ตาราง *** Product Grade *** ----------- 
    @ManyToOne(() => Product_grade, (product_grade_id) => product_grade_id.products)
    product_grade_id: Product_grade;

  //----------- ตาราง *** Unit *** ----------- 
    @ManyToOne(() => Unit, (unit) => unit.products)
    unit: Unit;

  //----------- ตาราง *** Product Company *** ----------- 
    @ManyToOne(() => ProductCompany, (product_companys) => product_companys.products)
    product_companys: ProductCompany;
 



}
