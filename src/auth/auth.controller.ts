import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { SignInCredentialsDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  public signIn(
    @Body()
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string; user: User }> {
    return this.authService.signIn(signInCredentialsDto);
  }
}
