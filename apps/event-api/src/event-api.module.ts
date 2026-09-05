import { Module } from '@nestjs/common';
import { EventApiController } from './event-api.controller';
import { EventApiService } from './event-api.service';

@Module({
  imports: [],
  controllers: [EventApiController],
  providers: [EventApiService],
})
export class EventApiModule {}
