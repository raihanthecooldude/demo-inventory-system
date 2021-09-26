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
import { Area } from './area.entity';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/area.dto';

@Controller('area')
export class AreaController {
  constructor(private areaService: AreaService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createArea(@Body() createAreaDto: CreateAreaDto): Promise<Area> {
    const result = await this.areaService.createArea(createAreaDto);
    return result;
  }

  @Get()
  async getArea(): Promise<Area[]> {
    return await this.areaService.getArea();
  }

  @Get('/:id')
  getProductByAreaId(
    @Param('id', ParseIntPipe)
    id: number,
  ): Promise<Area[]> {
    return this.areaService.getProductByAreaId(id);
  }
}
