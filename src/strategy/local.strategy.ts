import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/interfaces/user.interface';
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authSerice: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user: Partial<User> | null = await this.authSerice.validateUser(
      email,
      password,
    );
    if (!user) {
      throw new UnauthorizedException({
        message: 'Invalid password!!!',
      });
    }
    return user;
  }
}
