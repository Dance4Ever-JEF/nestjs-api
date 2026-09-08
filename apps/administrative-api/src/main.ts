import { NestFactory } from '@nestjs/core';
import { AdministrativeModule } from './administrative.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AdministrativeModule);

  app.setGlobalPrefix("/administrative-api/")

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  await app.listen(process.env.ADMINISTRATIVE_API_PORT ?? 3001);
}
bootstrap();
