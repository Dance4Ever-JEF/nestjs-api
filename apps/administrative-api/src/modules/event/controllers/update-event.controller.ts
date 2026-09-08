import { Body, Controller, Param, Patch, UseGuards } from "@nestjs/common";
import { UpdateEventService } from "../services";
import {
  UpdateEventRequestDTO,
  UpdateEventRouteParamsDTO,
  UpdateEventOutputDTO,
} from "../dto";
import { AdminGuard, JwtAuthGuard } from "libs/shared/src";

@Controller()
@UseGuards(JwtAuthGuard, AdminGuard)
export class UpdateEventController {
  constructor(
    private readonly updateEventService: UpdateEventService
  ) {}

  @Patch(":id")
  public async handle(
    @Param()
    param: UpdateEventRouteParamsDTO,

    @Body()
    input: UpdateEventRequestDTO
  ): Promise<UpdateEventOutputDTO> {
    return this.updateEventService.execute({
      ...param,
      ...input,
    });
  }
}
