import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CreateEventService } from "../services/create-event.service";
import { CreateEventOutputDTO, CreateEventRequestDTO } from "../dto";
import { AdminGuard, JwtAuthGuard } from "libs/shared/src";

@Controller()
@UseGuards(JwtAuthGuard, AdminGuard)
export class CreateEventController{
  constructor(
    private readonly createEventService: CreateEventService
  ){}

  @Post()
  public async handle(
    @Body()
    input: CreateEventRequestDTO
  ): Promise<CreateEventOutputDTO>{
    return await this.createEventService.execute(
      input
    );
  }
}
