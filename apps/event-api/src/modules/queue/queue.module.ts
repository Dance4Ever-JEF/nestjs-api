import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "libs/shared/src";
import { GetQueuePositionController, JoinQueueController } from "./controllers";
import { ExpireAdmittedService, GetQueuePositionService, JoinQueueService, ProcessQueueService, StartQueueProcessingService, StopQueueProcessingService  } from "./services";
import { TicketQueueProcessor } from "./processors";

@Module({
  imports: [
    DatabaseModule,

    BullModule.registerQueue({
      name: "ticket-queue"
    })
  ],
  controllers: [
    JoinQueueController,
    GetQueuePositionController,
  ],
  providers: [
    JoinQueueService,
    GetQueuePositionService,
    TicketQueueProcessor,
    ProcessQueueService,
    ExpireAdmittedService,
    StartQueueProcessingService,
    StopQueueProcessingService,
  ],
  exports: [
    StartQueueProcessingService,
    StopQueueProcessingService,
  ]
})
export class QueueModule{}
