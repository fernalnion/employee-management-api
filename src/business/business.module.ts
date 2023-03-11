import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Config } from 'src/interfaces/config.interface';
import { databaseproviders } from 'src/providers/database.provider';
import { userProviders } from 'src/providers/user.provider';
import { AuthService } from 'src/services/auth.service';
import { HarshService } from 'src/services/hash.service';
import { UserService } from 'src/services/user.service';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { LocalStrategy } from 'src/strategy/local.strategy';

const PROVIDERS = [...databaseproviders, ...userProviders];

const SERVICES = [AuthService, UserService, HarshService, ConfigService];

const STRATEGY = [LocalStrategy, JwtStrategy];

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<Config>) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '24h' },
        };
      },
      inject: [ConfigService],
    }),
  ],
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
