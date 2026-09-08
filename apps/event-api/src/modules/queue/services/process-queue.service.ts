import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";
import { QueueStatusEnum, RedisService } from "libs/shared/src";

@Injectable()
export class ProcessQueueService {
  constructor(
    private readonly redisService: RedisService,

    @InjectQueue("ticket-queue")
    private readonly ticketQueue: Queue,
  ) {}

  public async execute(data: {
    eventId: number;
    amount: number;
  }): Promise<void> {
    const redis = this.redisService.getClient();

    const queueKey = `queue:event:${data.eventId}`;

    const users = await redis.zrange(
      queueKey,
      0,
      String(data.amount - 1),
    );

    for (const queueId of users) {
      const admittedAt = Date.now();
      const expiresAt = admittedAt + 30 * 60 * 1000;

      await redis.hset(
        `queue:${queueId}`,
        "status",
        QueueStatusEnum.ADMITTED,
        "admittedAt",
        admittedAt.toString(),
        "expiresAt",
        expiresAt.toString(),
      );

      await redis.zrem(
        queueKey,
        queueId,
      );

      await this.ticketQueue.add(
        "expire-admitted",
        {
          queueId,
          eventId: data.eventId,
        },
        {
          delay: 30 * 60 * 1000,
        },
      );
    }
  }
}
