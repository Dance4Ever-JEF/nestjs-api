import { Module } from "@nestjs/common";
import { DatabaseModule } from "libs/shared/src";
import { BuyTicketsService, FindManyTicketsService } from "./services";
import { BuyTicketsController, FindManyTicketsController } from "./controllers";

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [
    BuyTicketsController,
    FindManyTicketsController,
  ],
  providers: [
    BuyTicketsService,
    FindManyTicketsService
  ]
})
export class TicketsModule{}
