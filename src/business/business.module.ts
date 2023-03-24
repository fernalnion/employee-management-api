import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { databaseproviders } from 'src/providers/database.provider';
import { tokenProviders } from 'src/providers/token.provider';
import { userProviders } from 'src/providers/user.provider';
import { AuthService } from 'src/services/auth.service';
import { HarshService } from 'src/services/hash.service';
import { TokenService } from 'src/services/token.service';
import { UserService } from 'src/services/user.service';
import { AccessTokenStrategy } from 'src/strategy/accessToken.strategy';
import { RefreshTokenStrategy } from 'src/strategy/refreshToken.strategy';

const PROVIDERS: Array<any> = [
  ...databaseproviders,
  ...userProviders,
  ...tokenProviders,
];

const SERVICES: Array<any> = [
  AuthService,
  UserService,
  HarshService,
  ConfigService,
  TokenService,
];

const STRATEGY: Array<any> = [AccessTokenStrategy, RefreshTokenStrategy];

@Module({
  imports: [ConfigModule, PassportModule, JwtModule.register({})],
  providers: [...PROVIDERS, ...SERVICES, ...STRATEGY],
  exports: [
    ...PROVIDERS,
    ...SERVICES,
    ...STRATEGY,
    ConfigModule,
    PassportModule,
    JwtModule,
  ],
})
export class BusinessModule {}
