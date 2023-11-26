import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Add this line

  app.setGlobalPrefix('api/v1'); // Set the global prefix to /api/v1/

  await app.listen(3000);
}

bootstrap();
