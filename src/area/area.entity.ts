import { Warehouse } from 'src/warehouse/warehouse.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Area extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'int' })
  code: number;

  @OneToMany(() => Warehouse, (warehouse) => warehouse.area)
  warehouses: Warehouse[];
}
