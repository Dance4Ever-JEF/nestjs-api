import { NestFactory } from '@nestjs/core';
import { EventApiModule } from './event-api.module';

async function bootstrap() {
  const app = await NestFactory.create(EventApiModule);
  await app.listen(process.env.EVENT_API_PORT ?? 3002);
}
bootstrap();
