import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { QueueStatusEnum, RedisService } from "libs/shared/src";
import { GetQueuePositionInputDTO, GetQueuePositionOutputDTO } from "../dto";

@Injectable()
export class GetQueuePositionService {
  constructor(
    private readonly redisService: RedisService,
  ) {}

  public async execute(
    { queueId }: GetQueuePositionInputDTO,
  ): Promise<GetQueuePositionOutputDTO> {

    const redis = this.redisService.getClient();

    const queueKey = `queue:${queueId}`;

    const queue = await redis.hgetall(queueKey);

    if (!queue || Object.keys(queue).length === 0)
      throw new NotFoundException(
        "A entrada na fila não foi encontrada.",
      );

    const eventId = Number(queue.eventId);
    const status = QueueStatusEnum[queue.status];

    const position = await redis.zrank(
      `queue:event:${eventId}`,
      queueId,
    );

    return {
      queueId,
      eventId,
      status,
      position: position != null ? position + 1 : null,
    };
  }
}
