import { IsNotEmpty, IsString } from 'class-validator';

export class SearchDto {
  @IsNotEmpty({ message: 'Invalid search request' })
  @IsString({ message: 'Invalid search request' })
  keyword: string;
}
