import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Area } from './area.entity';
import { CreateAreaDto } from './dto/area.dto';

@EntityRepository(Area)
export class AreaRepository extends Repository<Area> {
  async createArea(createAreaDto: CreateAreaDto): Promise<Area> {
    const { name, city, code } = createAreaDto;
    const area = new Area();
    area.name = name;
    area.city = city;
    area.code = code;

    // console.log(area);

    await area.save();
    return area;
  }

  async getArea(): Promise<Area[]> {
    const query = await this.createQueryBuilder('area');
    const result = await query.getMany();
    return result;
  }

  async getAreaById(id: number): Promise<Area> {
    const query = await this.createQueryBuilder('area');
    const found = await query.where('area.id = :id', { id: id }).getOne();

    if (!found) {
      throw new NotFoundException(`Area with ID ${id} not found`);
    }

    return found;
  }

  async getProductByAreaId(id: number) {
    const query = this.createQueryBuilder('area');
    const result = await query
      .leftJoinAndSelect('area.warehouses', 'warehouse')
      .leftJoinAndSelect(
        'warehouse.warehouseProductLists',
        'warehouseProductList',
      )
      .leftJoinAndSelect('warehouseProductList.product', 'product')
      .where('area.id = :val', { val: id })
      .getMany();

    return result;
  }
}
