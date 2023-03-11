import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { Config } from './interfaces/config.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService<Config>,
  ) {
    console.log(
      this.configService.get('PORT', { infer: true }),
      this.configService.get('MONGO_CONNECTION_STRING', { infer: true }),
      this.configService.get('JWT_SECRET', { infer: true }),
    );
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
