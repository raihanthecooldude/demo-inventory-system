import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { SignInCredentialsDto } from './dto/auth.dto';
import { JwtPayload } from './jwtPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async signIn(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string; user: User }> {
    if (
      Number(signInCredentialsDto.phone) < 1000000000 ||
      Number(signInCredentialsDto.phone) > 1999999999
    ) {
      throw new BadRequestException({
        statusCode: 400,
        message: [
          {
            property: 'phone',
            constraints: {
              notEqual: 'Please provide a valid phone number',
            },
          },
        ],
        error: 'Bad Request',
      });
    }
    const user = await this.userService.signIn(signInCredentialsDto);
    const id = user.id;
    const payload: JwtPayload = { id };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken, user };
  }
}
