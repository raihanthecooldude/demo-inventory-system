import { Product } from 'src/product/product.entity';
import { Warehouse } from 'src/warehouse/warehouse.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class WarehouseProductList extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  sourcingPrice: number;

  @ManyToOne(() => Product, (product) => product.warehouseProductLists, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.warehouseProductLists, {
    onDelete: 'CASCADE',
  })
  warehouse: Warehouse;
}
