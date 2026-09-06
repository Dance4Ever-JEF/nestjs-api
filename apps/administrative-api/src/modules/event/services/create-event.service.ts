import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "libs/shared/src";
import { CreateEventInputDTO, CreateEventOutputDTO } from "../dto";

@Injectable()
export class CreateEventService{
  constructor(
    private readonly prismaService: PrismaService
  ){}

  public async execute(
    { title, description, date, location, capacity, price } : CreateEventInputDTO
  ): Promise<CreateEventOutputDTO>{
    if (date <= new Date()) throw new BadRequestException("A data do evento deve ser depois de hoje.");

    const event = await this.prismaService.event.create({
      data: {
        title,
        description,
        date,
        location,
        capacity,
        price,
      },
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
      ...event,
      price: Number(event.price),
    };
  }
}
