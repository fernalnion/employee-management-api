import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request as RequestType } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Config } from 'src/interfaces/config.interface';
import { TokenService } from 'src/services/token.service';
type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService<Config>,
    private readonly _tokenService: TokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: RequestType, payload: JwtPayload) {
    const accessToken =
      req.get('Authorization')?.replace('Bearer', '').trim() ?? '';
    const tokenExists = await this._tokenService.count({
      userid: payload.sub,
      token: accessToken,
    });

    if (!tokenExists) throw new ForbiddenException('Access Denied');
    return payload;
  }
}
