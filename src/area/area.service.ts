import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from './area.entity';
import { AreaRepository } from './area.repository';
import { CreateAreaDto } from './dto/area.dto';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(AreaRepository)
    private areaRepository: AreaRepository,
  ) {}

  async createArea(createAreaDto: CreateAreaDto): Promise<Area> {
    return await this.areaRepository.createArea(createAreaDto);
  }

  async getArea(): Promise<Area[]> {
    return await this.areaRepository.getArea();
  }

  async getAreaById(id: number): Promise<Area> {
    return await this.areaRepository.getAreaById(id);
  }

  async getProductByAreaId(id: number): Promise<Area[]> {
    return await this.areaRepository.getProductByAreaId(id);
  }
}
