import { NotFoundException } from '@nestjs/common';
import { Area } from 'src/area/area.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateWarehouseDto } from './dto/warehouse.dto';
import { Warehouse } from './warehouse.entity';

@EntityRepository(Warehouse)
export class WarehouseRepository extends Repository<Warehouse> {
  async createWarehouse(
    createWarehouseDto: CreateWarehouseDto,
    area: Area,
  ): Promise<Warehouse> {
    const { name, address, contactInfo } = createWarehouseDto;
    const warehouse = new Warehouse();
    warehouse.name = name;
    warehouse.address = address;
    warehouse.contactInfo = contactInfo;
    warehouse.area = area;

    // console.log(warehouse);

    await warehouse.save();
    return warehouse;
  }

  async getWarehouse() {
    const query = this.createQueryBuilder('warehouse');
    const result = await query
      .leftJoinAndSelect('warehouse.area', 'area')
      .getMany();
    return result;
  }

  async getWarehouseById(id: number) {
    const query = this.createQueryBuilder('warehouse');
    const found = await query
      .leftJoinAndSelect('warehouse.area', 'area')
      .where('warehouse.id = :id', { id: id })
      .getOne();

    if (!found) {
      throw new NotFoundException(`Warehouse with ID ${id} not found`);
    }
    return found;
  }

  async getProductByWarehouseId(id: number) {
    const query = this.createQueryBuilder('warehouse');
    const result = await query
      .leftJoinAndSelect('warehouse.area', 'area')
      .leftJoinAndSelect(
        'warehouse.warehouseProductLists',
        'warehouseProductList',
      )
      .leftJoinAndSelect('warehouseProductList.product', 'product')
      .where('warehouse.id = :val', { val: id })
      .getMany();

    return result;
  }
}
