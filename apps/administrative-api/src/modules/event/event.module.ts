import { Module } from "@nestjs/common";
import { AuthModule, DatabaseModule } from "libs/shared/src";
import { CreateEventController, FindEventByIdController, FindManyEventsController } from "./controllers";
import { CreateEventService, FindEventByIdService, FindManyEventsService, UpdateEventService } from "./services";
import { UpdateEventController } from "./controllers/update-event.controller";

@Module({
  imports: [
    DatabaseModule,
    AuthModule
  ],
  controllers: [
    CreateEventController,
    FindManyEventsController,
    FindEventByIdController,
    UpdateEventController,
  ],
  providers: [
    CreateEventService,
    FindManyEventsService,
    FindEventByIdService,
    UpdateEventService,
  ]
})
export class EventModule{}
