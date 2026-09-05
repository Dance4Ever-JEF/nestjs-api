import { Controller, Get } from '@nestjs/common';
import { EventApiService } from './event-api.service';

@Controller()
export class EventApiController {
  constructor(private readonly eventApiService: EventApiService) {}

  @Get()
  getHello(): string {
    return this.eventApiService.getHello();
  }
}
