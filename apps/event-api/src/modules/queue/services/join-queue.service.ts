import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService, RedisService, QueueStatusEnum, EventStatusEnum } from "libs/shared/src";
import { JoinQueueInputDTO, JoinQueueOutputDTO } from "../dto";
import { randomUUID } from "crypto";

@Injectable()
export class JoinQueueService{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService,
  ){}

  public async execute(
    { eventId, userId }: JoinQueueInputDTO
  ): Promise<JoinQueueOutputDTO>{
    const event = await this.prismaService.event.findUnique({
      where: {
        id: eventId,
        status: EventStatusEnum.SALE_OPEN
      }
    });

    if (!event) throw new NotFoundException("Evento não encontrado.");

    const queueId = randomUUID();

    const redis = this.redisService.getClient();

    await redis.zadd(
      `queue:event:${eventId}`,
      Date.now(),
      queueId
    );

    await redis.hset(
      `queue:${queueId}`,
      "userId",
      userId,
      "eventId",
      eventId,
      "status",
      QueueStatusEnum.WAITING,
    );

    return {
      queueId,
      eventId,
      status: QueueStatusEnum[1],
    };
  }
}
