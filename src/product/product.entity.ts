import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
