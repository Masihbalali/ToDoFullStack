import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    // just allow the item that we need(declare in DTO) to came from API
    whitelist: true
  }))
  await app.listen(3000);
}
bootstrap();
