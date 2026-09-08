import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";

@Injectable()
export class StartQueueProcessingService {
  constructor(
    @InjectQueue("ticket-queue")
    private readonly ticketQueue: Queue,
  ) {}

  async execute(eventId: number): Promise<void> {
    await this.ticketQueue.upsertJobScheduler(
      `process-event-${eventId}`,
      {
        every: 10000,
      },
      {
        name: "process-queue",
        data: {
          eventId,
          amount: 10,
        },
      },
    );
  }
}
