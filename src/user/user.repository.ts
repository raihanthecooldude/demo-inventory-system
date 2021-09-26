import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { SignInCredentialsDto } from 'src/auth/dto/auth.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signIn(signInCredentialsDto: SignInCredentialsDto): Promise<User> {
    const { phone, password } = signInCredentialsDto;
    const user = await this.findOne({ where: { phone } });

    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      return null;
    }
  }
}
