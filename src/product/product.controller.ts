import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  CheckoutProductDto,
  CreateProductDto,
  UpdateProductDto,
} from './dto/product.dto';
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
  getProduct(): Promise<Product[]> {
    return this.productService.getProduct();
  }

  @Patch('/checkout')
  //   @UseGuards(AuthGuard('jwt'))
  async checkoutProduct(
    @Body() checkoutProductDto: CheckoutProductDto,
  ): Promise<Product> {
    const product = await this.productService.getProductById(
      checkoutProductDto.productId,
    );

    const result = await this.productService.checkoutProduct(
      checkoutProductDto.productId,
      product,
    );

    return result;
  }

  @Patch('/:id/update')
  //   @UseGuards(AuthGuard('jwt'))
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productService.getProductById(id);

    const result = await this.productService.updateProduct(
      id,
      product,
      updateProductDto,
    );

    return result;
  }
}
