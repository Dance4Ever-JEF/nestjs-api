import { Injectable } from "@nestjs/common";
import { PrismaService } from "libs/shared/src";
import { FindManyTicketsInputDTO } from "../dto/io/find-many-tickets-input.dto";
import { FindManyTicketsOutputDTO } from "../dto/io/find-many-tickets-output.dto";

@Injectable()
export class FindManyTicketsService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  public async execute({
    userId,
    eventId,
    skip,
    take,
  }: FindManyTicketsInputDTO): Promise<FindManyTicketsOutputDTO> {
    const where = {
      buyerId: userId,
      ...(eventId ? { eventId } : {}),
    };

    const [tickets, total] = await this.prismaService.$transaction([
      this.prismaService.ticket.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          cpf: true,
          halfPrice: true,
          used: true,
          createdAt: true,
          event: {
            select: {
              id: true,
              title: true,
              description: true,
              date: true,
              location: true,
              status: true,
            },
          },
        },
      }),
      this.prismaService.ticket.count({ where }),
    ]);

    return { tickets, total };
  }
}
