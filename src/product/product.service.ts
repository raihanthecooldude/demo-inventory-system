import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchDto } from 'src/search/dto/search.dto';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
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

  async getProduct(): Promise<Product[]> {
    return await this.productRepository.getProduct();
  }

  async getProductById(id: number): Promise<Product> {
    return await this.productRepository.getProductById(id);
  }

  async searchProduct(searchDto: SearchDto) {
    return await this.productRepository.searchProduct(searchDto);
  }

  async checkoutProduct(id: number, product: Product) {
    return await this.productRepository.checkoutProduct(id, product);
  }

  async updateProduct(
    id: number,
    product: Product,
    updateProductDto: UpdateProductDto,
  ) {
    return await this.productRepository.updateProduct(
      id,
      product,
      updateProductDto,
    );
  }
}
