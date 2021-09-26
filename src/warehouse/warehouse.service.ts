import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from 'src/area/area.entity';
import { CreateWarehouseDto } from './dto/warehouse.dto';
import { Warehouse } from './warehouse.entity';
import { WarehouseRepository } from './warehouse.repository';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(WarehouseRepository)
    private warehouseRepository: WarehouseRepository,
  ) {}

  async createWarehouse(
    createWarehouseDto: CreateWarehouseDto,
    area: Area,
  ): Promise<Warehouse> {
    return await this.warehouseRepository.createWarehouse(
      createWarehouseDto,
      area,
    );
  }

  async getWarehouse(): Promise<Warehouse[]> {
    return await this.warehouseRepository.getWarehouse();
  }

  async getWarehouseById(id: number): Promise<Warehouse> {
    return await this.warehouseRepository.getWarehouseById(id);
  }

  async getProductByWarehouseId(id: number): Promise<Warehouse[]> {
    return await this.warehouseRepository.getProductByWarehouseId(id);
  }
}
