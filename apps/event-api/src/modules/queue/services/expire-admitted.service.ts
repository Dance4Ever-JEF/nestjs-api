import { Injectable } from "@nestjs/common";
import { QueueStatusEnum, RedisService } from "libs/shared/src";

@Injectable()
export class ExpireAdmittedService {
  constructor(
    private readonly redisService: RedisService,
  ) {}

  async execute(data: {
    queueId: string;
    eventId: number;
  }): Promise<void> {
    const redis = this.redisService.getClient();

    const key = `queue:${data.queueId}`;

    const status = await redis.hget(key, "status");

    if (status !== String(QueueStatusEnum.ADMITTED)) {
      return;
    }

    await redis.hset(
      key,
      "status",
      QueueStatusEnum.EXPIRED,
    );
  }
}
