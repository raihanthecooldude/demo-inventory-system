import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from './dto/product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  //   @UseGuards(AuthGuard('jwt'))
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    const result = await this.productService.createProduct(createProductDto);
    return result;
  }

  @Get()
  getProduct() {
    return this.productService.getProduct();
  }
}
