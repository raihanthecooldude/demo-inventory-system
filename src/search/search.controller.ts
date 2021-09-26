import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { SearchDto } from './dto/search.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(
    private searchService: SearchService,
    private productService: ProductService,
  ) {}

  @Get()
  async search(
    @Query()
    searchDto: SearchDto,
  ) {
    const result = {
      product: null,
    };

    const product = await this.productService.searchProduct(searchDto);
    if (product) {
      result.product = product;
    }

    return result;
  }
}
