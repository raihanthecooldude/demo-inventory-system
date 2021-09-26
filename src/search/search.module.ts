import { Module } from '@nestjs/common';
import { ProductModule } from 'src/product/product.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [ProductModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
