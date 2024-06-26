import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { setupSwagger } from '@Config/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Habilitar CORS
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);
  const port = process.env.PORT || 8000;
  await app.listen(port);
}
bootstrap();
