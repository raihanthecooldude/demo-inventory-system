import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/product/product.module';
import { WarehouseModule } from 'src/warehouse/warehouse.module';
import { WarehouseProductListController } from './warehouse-product-list.controller';
import { WarehouseProductListRepository } from './warehouse-product-list.repository';
import { WarehouseProductListService } from './warehouse-product-list.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([WarehouseProductListRepository]),
    WarehouseModule,
    ProductModule,
  ],
  controllers: [WarehouseProductListController],
  providers: [WarehouseProductListService],
})
export class WarehouseProductListModule {}
