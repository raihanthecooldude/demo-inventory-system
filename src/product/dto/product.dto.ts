import {
  IsBooleanString,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'invalid product name' })
  @IsNotEmpty({ message: 'invalid product name' })
  name: string;

  @IsNumber({}, { message: 'invalid product selling price' })
  sellingPrice: number;

  @IsOptional()
  @IsString({ message: 'invalid product description' })
  description: string;

  @IsNumber({}, { message: 'invalid product inventory' })
  inventory: number;
}
