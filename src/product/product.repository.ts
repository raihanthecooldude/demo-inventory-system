import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from './dto/product.dto';
import { Product } from './product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name, sellingPrice, description, inventory } = createProductDto;
    const product = new Product();
    product.name = name;
    product.sellingPrice = sellingPrice;
    product.description = description;
    product.inventory = inventory;

    // console.log(product);

    await product.save();
    return product;
  }

  async getProduct() {
    const query = this.createQueryBuilder('product');
    const result = await query.getMany();
    return result;
  }
}
