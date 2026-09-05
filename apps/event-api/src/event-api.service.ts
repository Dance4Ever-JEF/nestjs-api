import { Injectable } from '@nestjs/common';

@Injectable()
export class EventApiService {
  getHello(): string {
    return 'Hello World!';
  }
}
