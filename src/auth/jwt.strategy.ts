import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as config from 'config';
import { JwtPayload } from './jwtPayload.interface';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('jwt.secret'),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;
    // console.log(payload);
    const user = await this.userService.findOneWithId(id);
    // console.log(user);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
