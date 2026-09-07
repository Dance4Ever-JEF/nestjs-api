import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { EventStatusEnum, PrismaService } from "libs/shared/src";
import { UpdateEventStatusInputDTO, UpdateEventStatusOutputDTO } from "../dto";
import { StartQueueProcessingService, StopQueueProcessingService } from "apps/event-api/src/modules/queue/services";

@Injectable()
export class UpdateEventStatusService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly startQueueProcessingService: StartQueueProcessingService,
    private readonly stopQueueProcessingService: StopQueueProcessingService
  ) {}

  public async execute({
    eventId,
    status,
  }: UpdateEventStatusInputDTO): Promise<UpdateEventStatusOutputDTO> {

    const event = await this.prismaService.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) throw new NotFoundException("Evento não encontrado.");

    if (
      event.status === "DRAFT" &&
      status === EventStatusEnum.SALE_OPEN
    ) {
      await this.startQueueProcessingService.execute(eventId);
    } else if (event.status === "SALE_OPEN"){
      await this.stopQueueProcessingService.execute(eventId);
    }

    const updatedEvent = await this.prismaService.event.update({
      where: {
        id: eventId,
      },
      data: {
        status: status,
      },
      select: {
        id: true,
        title: true,
        status: true,
        updatedAt: true,
      },
    });

    return {
      ...updatedEvent,
      status: updatedEvent.status as EventStatusEnum
    };
  }
}
