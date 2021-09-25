import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/product.dto';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productRepository.createProduct(createProductDto);
  }

  async getProduct() {
    return this.productRepository.getProduct();
  }
}
