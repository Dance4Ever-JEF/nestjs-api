import { NestFactory } from '@nestjs/core';
import { EventApiModule } from './event-api.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(EventApiModule);

  app.setGlobalPrefix("/api/v1/event");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      transform: true
    })
  );
  
  await app.listen(process.env.EVENT_API_PORT ?? 3002);
}
bootstrap();
