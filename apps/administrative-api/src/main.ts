import { NestFactory } from '@nestjs/core';
import { AdministrativeModule } from './administrative.module';

async function bootstrap() {
  const app = await NestFactory.create(AdministrativeModule);
  await app.listen(process.env.ADMINISTRATIVE_API_PORT ?? 3001);
}
bootstrap();
