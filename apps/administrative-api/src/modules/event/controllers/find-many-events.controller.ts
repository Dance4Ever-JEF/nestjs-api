import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AdminGuard, JwtAuthGuard } from "libs/shared/src";
import { FindManyEventsService } from "../services";
import { FindManyEventsOutputDTO, FindManyEventsQueryParamsDTO } from "../dto";

@Controller()
@UseGuards(JwtAuthGuard, AdminGuard)
export class FindManyEventsController{
  constructor(
    private readonly findManyEventsService: FindManyEventsService
  ){}

  @Get()
  public async handle(
    @Query()
    query: FindManyEventsQueryParamsDTO
  ): Promise<FindManyEventsOutputDTO>{
    return this.findManyEventsService.execute(
      query
    );
  }
}
