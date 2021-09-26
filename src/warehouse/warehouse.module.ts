import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaModule } from 'src/area/area.module';
import { WarehouseController } from './warehouse.controller';
import { WarehouseRepository } from './warehouse.repository';
import { WarehouseService } from './warehouse.service';

@Module({
  imports: [TypeOrmModule.forFeature([WarehouseRepository]), AreaModule],
  controllers: [WarehouseController],
  providers: [WarehouseService],
  exports: [WarehouseService],
})
export class WarehouseModule {}
