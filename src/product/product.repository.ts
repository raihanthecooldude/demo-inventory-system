import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { SearchDto } from 'src/search/dto/search.dto';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductAvailability } from './product-availability.enum';
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

  async getProduct(): Promise<Product[]> {
    const query = this.createQueryBuilder('product');
    const result = await query.getMany();
    return result;
  }

  async getProductById(id: number) {
    const query = this.createQueryBuilder('product');
    const found = await query.where('product.id = :id', { id: id }).getOne();

    if (!found) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return found;
  }

  async searchProduct(searchDto: SearchDto) {
    const query = await this.createQueryBuilder('product');
    const found = await query
      .leftJoinAndSelect(
        'product.warehouseProductLists',
        'warehouseProductList',
      )
      .leftJoinAndSelect('warehouseProductList.warehouse', 'warehouse')
      .leftJoinAndSelect('warehouse.area', 'area')
      .where(
        '(product.name ILIKE :search OR product.description ILIKE :search)',
        {
          search: `%${searchDto.keyword}%`,
        },
      )
      .getMany();

    // console.log(found);

    if (!found) {
      return null;
    }

    return found;
  }

  async checkoutProduct(id: number, product: Product): Promise<Product> {
    if (product.inventory > 0) {
      product.inventory--;
      if (product.inventory == 0) {
        product.productAvailability = ProductAvailability.STOCKET_OUT;
      }
    } else {
      throw new NotAcceptableException(
        `Product with ID ${id} is not available for checkout`,
      );
    }

    await product.save();
    return product;
  }

  async updateProduct(
    id: number,
    product: Product,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { inventory, productAvailability } = updateProductDto;

    if (inventory) {
      product.inventory += inventory;
    }

    if (productAvailability) {
      product.productAvailability = productAvailability;
    }

    if (product.inventory > 0) {
      product.productAvailability = ProductAvailability.AVAILABLE;
    } else {
      product.productAvailability = ProductAvailability.STOCKET_OUT;
    }

    await product.save();
    return product;
  }
}
