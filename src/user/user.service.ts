import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInCredentialsDto } from 'src/auth/dto/auth.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signIn(signInCredentialsDto: SignInCredentialsDto): Promise<User> {
    const user = await this.userRepository.signIn(signInCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return user;
  }

  async findOneWithId(id: number): Promise<User> {
    return await this.userRepository.findOne({ id });
  }
}
