import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAreaDto {
  @IsString({ message: 'invalid area' })
  @IsNotEmpty({ message: 'invalid area' })
  name: string;

  @IsString({ message: 'invalid city' })
  @IsNotEmpty({ message: 'invalid city' })
  city: string;

  @IsNumber({}, { message: 'invalid area code' })
  @IsNotEmpty({ message: 'invalid area code' })
  code: number;
}
