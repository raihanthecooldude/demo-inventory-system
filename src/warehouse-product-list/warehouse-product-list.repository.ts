import { NotFoundException } from '@nestjs/common';
import { Product } from 'src/product/product.entity';
import { Warehouse } from 'src/warehouse/warehouse.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateWarehouseProductListDto } from './dto/warehouse-product-list.dto';
import { WarehouseProductList } from './warehouse-product-list.entity';

@EntityRepository(WarehouseProductList)
export class WarehouseProductListRepository extends Repository<WarehouseProductList> {
  async createWarehouseProductList(
    createWarehouseProductListDto: CreateWarehouseProductListDto,
    warehouse: Warehouse,
    product: Product,
  ): Promise<WarehouseProductList> {
    const { sourcingPrice } = createWarehouseProductListDto;
    const newProduct = new WarehouseProductList();
    newProduct.sourcingPrice = sourcingPrice;
    newProduct.warehouse = warehouse;
    newProduct.product = product;

    // console.log(newProduct);

    await newProduct.save();
    return newProduct;
  }

  async getAllWarehouseProductList() {
    const query = this.createQueryBuilder('warehouseProductList');
    const result = await query
      .leftJoinAndSelect('warehouseProductList.product', 'product')
      .leftJoinAndSelect('warehouseProductList.warehouse', 'warehouse')
      .leftJoinAndSelect('warehouse.area', 'area')
      .getMany();
    return result;
  }
}
