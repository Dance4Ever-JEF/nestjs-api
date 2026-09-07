import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";

@Injectable()
export class StopQueueProcessingService {
  constructor(
    @InjectQueue("ticket-queue")
    private readonly ticketQueue: Queue,
  ) {}

  async execute(eventId: number): Promise<void> {
    await this.ticketQueue.removeJobScheduler(
      `process-event-${eventId}`,
    );
  }
}
