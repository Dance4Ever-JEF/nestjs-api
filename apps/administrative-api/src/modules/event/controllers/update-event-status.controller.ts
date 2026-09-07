import {
  Body,
  Controller,
  Param,
  Patch,
  UseGuards,
} from "@nestjs/common";

import { UpdateEventStatusService } from "../services/update-event-status.service";
import { UpdateEventStatusRequestDTO, UpdateEventStatusRouteParamsDTO } from "../dto";
import { AdminGuard, JwtAuthGuard } from "libs/shared/src";

@Controller()
@UseGuards(JwtAuthGuard, AdminGuard)
export class UpdateEventStatusController {
  constructor(
    private readonly updateEventStatusService: UpdateEventStatusService,
  ) {}

  @Patch(":id/status")
  public async handle(
    @Param() 
    params: UpdateEventStatusRouteParamsDTO,
    
    @Body() 
    body: UpdateEventStatusRequestDTO,
  ) {
    return await this.updateEventStatusService.execute({
      eventId: params.id,
      status: body.status,
    });
  }
}
