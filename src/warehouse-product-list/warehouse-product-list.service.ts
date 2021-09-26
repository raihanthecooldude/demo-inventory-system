import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { Warehouse } from 'src/warehouse/warehouse.entity';
import { CreateWarehouseProductListDto } from './dto/warehouse-product-list.dto';
import { WarehouseProductList } from './warehouse-product-list.entity';
import { WarehouseProductListRepository } from './warehouse-product-list.repository';

@Injectable()
export class WarehouseProductListService {
  constructor(
    @InjectRepository(WarehouseProductListRepository)
    private warehouseProductListRepository: WarehouseProductListRepository,
  ) {}

  async createWarehouseProductList(
    createWarehouseProductListDto: CreateWarehouseProductListDto,
    warehouse: Warehouse,
    product: Product,
  ): Promise<WarehouseProductList> {
    return await this.warehouseProductListRepository.createWarehouseProductList(
      createWarehouseProductListDto,
      warehouse,
      product,
    );
  }

  async getWarehouseProductList(): Promise<WarehouseProductList[]> {
    return await this.warehouseProductListRepository.getAllWarehouseProductList();
  }
}
