import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove unknown properties from DTOs
    }),
  ); // Enable global pipes
  app.enableCors(); // Enable CORS
  app.setGlobalPrefix('api/v1'); // Set the global prefix to /api/v1/
  const port = process.env.PORT || 3000;
  await app.listen(port);
}

bootstrap();
