import { Area } from 'src/area/area.entity';
import { WarehouseProductList } from 'src/warehouse-product-list/warehouse-product-list.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Warehouse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'int' })
  contactInfo: number;

  @ManyToOne(() => Area, (area) => area.warehouses, {
    onDelete: 'CASCADE',
  })
  area: Area;

  @OneToMany(
    () => WarehouseProductList,
    (warehouseProductList) => warehouseProductList.warehouse,
  )
  warehouseProductLists: WarehouseProductList[];
}
