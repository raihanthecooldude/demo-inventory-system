import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWarehouseDto {
  @IsString({ message: 'invalid warehouse name' })
  @IsNotEmpty({ message: 'invalid warehouse name' })
  name: string;

  @IsString({ message: 'invalid warehouse address' })
  @IsNotEmpty({ message: 'invalid warehouse address' })
  address: string;

  @IsNumber({}, { message: 'invalid contact info' })
  @IsNotEmpty({ message: 'invalid contact info' })
  contactInfo: number;
}
