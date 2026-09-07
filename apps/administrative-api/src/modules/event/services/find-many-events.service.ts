import { EventStatusEnum, PrismaService } from "libs/shared/src";
import { FindManyEventsInputDTO, FindManyEventsOutputDTO } from "../dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindManyEventsService{
  constructor(
    private readonly prismaService: PrismaService
  ){}

  public async execute(
    { take, skip, title }: FindManyEventsInputDTO
  ): Promise<FindManyEventsOutputDTO>{
    const [
      events, 
      totalCount 
    ] = await Promise.all([
      this.prismaService.event.findMany({
        where: title
          ? {
            title: {
              contains: title,
              mode: "insensitive",
            },
          } : undefined,
          skip,
          take,
          select: {
            id: true,
            title: true,
            description: true,
            date: true,
            location: true,
            capacity: true,
            price: true,
            status: true,
          }
      }),
      this.prismaService.event.count({
        where: title
          ? {
            title: {
              contains: title,
              mode: "insensitive",
            },
          }
            : undefined,
      })
    ]);

    return {
      events: events.map((event) => ({
        ...event,
        status: event.status as EventStatusEnum,
        price: Number(event.price),
      })),
      totalCount
    }
  }
}
