import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { set } from 'mongoose';
import { AppModule } from './app.module';
import { Config } from './interfaces/config.interface';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService<Config>);
  set('debug', process.env.NODE_ENV !== 'production');

  // swagger setup
  const config = new DocumentBuilder()
    .setTitle('EMS Api Docs')
    .setDescription('EMS Api Integration')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // addons
  app.use(helmet());

  await app.listen(configService.get<number>('PORT') ?? 3000);
  console.log(`Application running on:${await app.getUrl()}`);
}
bootstrap();
