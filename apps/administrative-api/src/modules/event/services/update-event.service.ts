import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "libs/shared/src";
import { UpdateEventInputDTO, UpdateEventOutputDTO } from "../dto";

@Injectable()
export class UpdateEventService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  public async execute(
    { id, ...data }: UpdateEventInputDTO
  ): Promise<UpdateEventOutputDTO> {

    const event = await this.prismaService.event.findUnique({
      where: {
        id,
      },
    });

    if (!event) throw new NotFoundException("O evento não foi encontrado.");

    const updatedEvent = await this.prismaService.event.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        title: true,
        description: true,
        date: true,
        location: true,
        capacity: true,
        price: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      ...updatedEvent,
      price: Number(updatedEvent.price)
    };
  }
}
