import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "libs/shared/src";
import { JoinQueueController } from "./controllers";
import { JoinQueueService } from "./services";

@Module({
  imports: [
    DatabaseModule,

    BullModule.registerQueue({
      name: "ticket-queue"
    })
  ],
  controllers: [
    JoinQueueController,
  ],
  providers: [
    JoinQueueService
  ]
})
export class QueueModule{}
