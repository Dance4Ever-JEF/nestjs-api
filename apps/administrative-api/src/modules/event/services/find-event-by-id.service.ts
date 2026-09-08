import { Injectable, NotFoundException } from "@nestjs/common";
import { EventStatusEnum, PrismaService } from "libs/shared/src";
import { FindEventByIdInputDTO, FindEventByIdOutputDTO } from "../dto";

@Injectable()
export class FindEventByIdService{
  constructor(
    private readonly prismaService: PrismaService
  ){}

  public async execute(
    { id }: FindEventByIdInputDTO
  ): Promise<FindEventByIdOutputDTO>{
    const event = await this.prismaService.event.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        date: true,
        location: true,
        capacity: true,
        price: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!event) throw new NotFoundException("O evento não foi encontrado.");

    return {
      ...event,
      status: event.status as EventStatusEnum,
      price: Number(event.price)
    };
  }
}
