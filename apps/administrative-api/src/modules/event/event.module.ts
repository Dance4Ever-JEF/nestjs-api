import { Module } from "@nestjs/common";
import { AuthModule, DatabaseModule } from "libs/shared/src";
import { CreateEventController, FindEventByIdController, FindManyEventsController, UpdateEventController, UpdateEventStatusController } from "./controllers";
import { CreateEventService, FindEventByIdService, FindManyEventsService, UpdateEventService, UpdateEventStatusService } from "./services";
import { QueueModule } from "apps/event-api/src/modules/queue/queue.module";
import { StartQueueProcessingService, StopQueueProcessingService } from "apps/event-api/src/modules/queue/services";
import { BullModule } from "@nestjs/bullmq";

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    QueueModule,

    BullModule.registerQueue({
      name: "ticket-queue"
    })
  ],
  controllers: [
    CreateEventController,
    FindManyEventsController,
    FindEventByIdController,
    UpdateEventController,
    UpdateEventStatusController,
  ],
  providers: [
    CreateEventService,
    FindManyEventsService,
    FindEventByIdService,
    UpdateEventService,
    UpdateEventStatusService,
    StartQueueProcessingService,
    StopQueueProcessingService,
  ]
})
export class EventModule{}
