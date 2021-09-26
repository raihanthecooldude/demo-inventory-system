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
import { AreaService } from 'src/area/area.service';
import { CreateWarehouseDto } from './dto/warehouse.dto';
import { Warehouse } from './warehouse.entity';
import { WarehouseService } from './warehouse.service';

@Controller('warehouse')
export class WarehouseController {
  constructor(
    private warehouseService: WarehouseService,
    private areaService: AreaService,
  ) {}

  @Post('/:id')
  @UseGuards(AuthGuard('jwt'))
  async createWarehouse(
    @Param('id', ParseIntPipe) id: number,
    @Body() createWarehouseDto: CreateWarehouseDto,
  ): Promise<Warehouse> {
    const area = await this.areaService.getAreaById(id);

    const result = await this.warehouseService.createWarehouse(
      createWarehouseDto,
      area,
    );
    return result;
  }

  @Get()
  getWarehouse(): Promise<Warehouse[]> {
    return this.warehouseService.getWarehouse();
  }

  @Get('/:id')
  getProductByWarehouseId(
    @Param('id', ParseIntPipe)
    id: number,
  ): Promise<Warehouse[]> {
    return this.warehouseService.getProductByWarehouseId(id);
  }
}
