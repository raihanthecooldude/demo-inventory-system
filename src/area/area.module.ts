import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaController } from './area.controller';
import { AreaRepository } from './area.repository';
import { AreaService } from './area.service';

@Module({
  imports: [TypeOrmModule.forFeature([AreaRepository])],
  controllers: [AreaController],
  providers: [AreaService],
  exports: [AreaService],
})
export class AreaModule {}
