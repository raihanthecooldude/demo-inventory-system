import {
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductAvailability } from '../product-availability.enum';

export class CreateProductDto {
  @IsString({ message: 'invalid product name' })
  @IsNotEmpty({ message: 'invalid product name' })
  name: string;

  @IsNumber({}, { message: 'invalid product selling price' })
  @IsNotEmpty({ message: 'invalid product selling price' })
  sellingPrice: number;

  @IsOptional()
  @IsString({ message: 'invalid product description' })
  description: string;

  @IsNumber({}, { message: 'invalid product inventory' })
  @IsNotEmpty({ message: 'invalid product inventory' })
  inventory: number;
}

export class CheckoutProductDto {
  @IsNumber({}, { message: 'invalid product' })
  @IsNotEmpty({ message: 'invalid product' })
  productId: number;
}

export class UpdateProductDto {
  @IsOptional()
  @IsNumber({}, { message: 'invalid product quantity' })
  inventory: number;

  @IsOptional()
  @IsEnum(ProductAvailability)
  @IsIn([ProductAvailability.AVAILABLE, ProductAvailability.STOCKET_OUT])
  productAvailability: ProductAvailability;
}
