import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Config } from 'src/interfaces/config.interface';
import { User } from 'src/interfaces/user.interface';
import { HarshService } from './hash.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _hashService: HarshService,
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService<Config>,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<User> | null> {
    const user: User | null = await this._userService.findOne(email);
    if (
      user &&
      (await this._hashService.comparePassword(password, user.passwordhash))
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordhash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this._jwtService.sign(payload, {
        secret: this._configService.get<string>('JWT_SECRET'),
      }),
    };
  }
}
