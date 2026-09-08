import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { CurrentUser, JwtAuthGuard } from "libs/shared/src"; 
import { FindManyTicketsService } from "../services";
import { FindManyTicketsQueryParamsDTO } from "../dto";
import type { AuthenticatedUser } from "libs/shared/src";

@Controller()
@UseGuards(JwtAuthGuard)
export class FindManyTicketsController {
  constructor(
    private readonly findManyTicketsService: FindManyTicketsService,
  ) {}

  @Get()
  public async execute(
    @Query() 
    query: FindManyTicketsQueryParamsDTO,

    @CurrentUser()
    user: AuthenticatedUser
  ) {
    return this.findManyTicketsService.execute({
      ...query,
      userId: user.id
    });
  }
}
