import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductService } from 'src/product/product.service';
import { WarehouseService } from 'src/warehouse/warehouse.service';
import { CreateWarehouseProductListDto } from './dto/warehouse-product-list.dto';
import { WarehouseProductList } from './warehouse-product-list.entity';
import { WarehouseProductListService } from './warehouse-product-list.service';

@Controller('warehouse-product-list')
export class WarehouseProductListController {
  constructor(
    private warehouseProductListService: WarehouseProductListService,
    private warehouseService: WarehouseService,
    private productService: ProductService,
  ) {}

  @Post('/:id')
  @UseGuards(AuthGuard('jwt'))
  async createWarehouseProductList(
    @Param('id', ParseIntPipe) id: number,
    @Body() createWarehouseProductListDto: CreateWarehouseProductListDto,
  ): Promise<WarehouseProductList> {
    const warehouse = await this.warehouseService.getWarehouseById(id);
    const product = await this.productService.getProductById(
      createWarehouseProductListDto.productId,
    );

    const result =
      await this.warehouseProductListService.createWarehouseProductList(
        createWarehouseProductListDto,
        warehouse,
        product,
      );
    return result;
  }

  @Get()
  getWarehouseProductList(): Promise<WarehouseProductList[]> {
    return this.warehouseProductListService.getWarehouseProductList();
  }
}
