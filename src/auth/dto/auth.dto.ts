import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SignInCredentialsDto {
  @IsNumber({}, { message: 'Invalid Credentials' })
  @IsNotEmpty({
    message: 'Invalid Credentials',
  })
  phone: string;

  @IsNotEmpty({ message: 'Invalid Credentials' })
  @IsString({ message: 'Invalid Credentials' })
  password: string;
}
