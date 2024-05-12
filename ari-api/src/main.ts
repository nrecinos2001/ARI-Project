import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { setupSwagger } from '@Config/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
