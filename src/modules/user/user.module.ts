import { Module } from '@nestjs/common';
import { BusinessModule } from 'src/business/business.module';
import { UserController } from './user.controller';

@Module({
  imports: [BusinessModule],
  controllers: [UserController],
  providers: [],
  exports: [],
})
export class UserModule {}
