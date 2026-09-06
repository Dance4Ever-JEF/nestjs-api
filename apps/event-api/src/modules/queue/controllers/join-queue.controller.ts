import { Controller, Param, Post, UseGuards } from "@nestjs/common";
import { JoinQueueOutputDTO, JoinQueueRouteParamsDTO } from "../dto";
import { JoinQueueService } from "../services";
import { CurrentUser, JwtAuthGuard } from "libs/shared/src";
import type { AuthenticatedUser } from "libs/shared/src";

@Controller()
@UseGuards(JwtAuthGuard)
export class JoinQueueController{
  constructor(
    private readonly joinQueueService: JoinQueueService
  ){}

  @Post(':eventId/join')
  public async handle(
    @Param()
    params: JoinQueueRouteParamsDTO,

    @CurrentUser()
    user: AuthenticatedUser
  ): Promise<JoinQueueOutputDTO>{
    return await this.joinQueueService.execute({
      ...params,
      userId: user.id
    });
  }
}
