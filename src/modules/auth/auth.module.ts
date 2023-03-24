import { Module } from '@nestjs/common';
import { BusinessModule } from 'src/business/business.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [BusinessModule],
  controllers: [AuthController],
  providers: [],
  exports: [],
})
export class AuthModule { }
