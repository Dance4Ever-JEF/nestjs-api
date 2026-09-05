import { Test, TestingModule } from '@nestjs/testing';
import { EventApiController } from './event-api.controller';
import { EventApiService } from './event-api.service';

describe('EventApiController', () => {
  let eventApiController: EventApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EventApiController],
      providers: [EventApiService],
    }).compile();

    eventApiController = app.get<EventApiController>(EventApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(eventApiController.getHello()).toBe('Hello World!');
    });
  });
});
