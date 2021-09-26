import { WarehouseProductList } from 'src/warehouse-product-list/warehouse-product-list.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductAvailability } from './product-availability.enum';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'int' })
  sellingPrice: number;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'int', default: 0 })
  inventory: number;

  @Column({
    type: 'enum',
    enum: ProductAvailability,
    default: ProductAvailability.AVAILABLE,
  })
  productAvailability: ProductAvailability;

  @OneToMany(
    () => WarehouseProductList,
    (warehouseProductList) => warehouseProductList.product,
  )
  warehouseProductLists: WarehouseProductList[];
}
