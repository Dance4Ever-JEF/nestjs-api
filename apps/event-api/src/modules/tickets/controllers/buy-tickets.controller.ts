import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { BuyTicketsService } from "../services/buy-tickets.service";
import { BuyTicketsOutputDTO, BuyTicketsRequestDTO, BuyTicketsRouteParamsDTO } from "../dto";
import { CurrentUser, JwtAuthGuard } from "libs/shared/src";
import type { AuthenticatedUser } from "libs/shared/src";

@Controller()
@UseGuards(JwtAuthGuard)
export class BuyTicketsController{
  constructor(
    private readonly buyTicketsService: BuyTicketsService
  ){}

  @Post("/:queueId/buy")
  public async handle(
    @Param()
    params: BuyTicketsRouteParamsDTO,

    @Body()
    input: BuyTicketsRequestDTO,

    @CurrentUser()
    user: AuthenticatedUser
  ): Promise<BuyTicketsOutputDTO>{
    return await this.buyTicketsService.execute({
      ...params,
      ...input,
      userId: user.id
    });
  }
}
