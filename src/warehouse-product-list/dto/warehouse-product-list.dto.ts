import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWarehouseProductListDto {
  @IsNumber({}, { message: 'invalid product sourcing price' })
  @IsNotEmpty({ message: 'invalid product sourcing price' })
  sourcingPrice: number;

  @IsNumber({}, { message: 'invalid product id' })
  @IsNotEmpty({ message: 'invalid product id' })
  productId: number;
}
