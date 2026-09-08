import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService, QueueStatusEnum, RedisService } from "libs/shared/src";
import { Prisma } from "generated/prisma/client";
import { BuyTicketsInputDTO, BuyTicketsOutputDTO } from "../dto";

@Injectable()
export class BuyTicketsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  public async execute(
    { queueId, tickets, userId }: BuyTicketsInputDTO,
  ): Promise<BuyTicketsOutputDTO>{
    const redis = this.redisService.getClient();
    const queueKey = `queue:${queueId}`;
    const queueData = await redis.hgetall(queueKey);

    if (!queueData || Object.keys(queueData).length === 0) {
      throw new NotFoundException("Fila não encontrada.");
    }

    if (Number(queueData.status) !== QueueStatusEnum.ADMITTED) {
      throw new ForbiddenException("Você ainda não foi admitido na fila.");
    }

    if (Number(queueData.expiresAt) < Date.now()) {
      throw new ForbiddenException("Sua admissão na fila expirou.");
    }

    const eventId = Number(queueData.eventId); 

    return this.prismaService.$transaction(
      async (tx) => {
        const event = await tx.event.findUnique({ where: { id: eventId } });
        if (!event) throw new NotFoundException("Evento não encontrado.");

        const soldCount = await tx.ticket.count({ where: { eventId } });

        if (soldCount + tickets.length > event.capacity) {
          throw new BadRequestException(
            "Não há ingressos suficientes disponíveis para este evento.",
          );
        }

        const createdTickets = await Promise.all(
          tickets.map((ticket) =>
            tx.ticket.create({
              data: {
                eventId,
                buyerId: userId,
                cpf: ticket.cpf,
                halfPrice: ticket.isHalfPrice ?? false,
              },
            }),
          ),
        );

        await redis.del(queueKey);

        return {
          tickets: createdTickets
        };
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );
  }
}
