import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { FindEventByIdService } from "../services";
import { FindEventByIdRouteParamsDTO } from "../dto";
import { AdminGuard, JwtAuthGuard } from "libs/shared/src";

@Controller()
@UseGuards(JwtAuthGuard, AdminGuard)
export class FindEventByIdController{
  constructor(
    private readonly findEventByIdService: FindEventByIdService
  ){}

  @Get(":id")
  public async handle(
    @Param()
    param: FindEventByIdRouteParamsDTO
  ){
    return this.findEventByIdService.execute(
      param
    );
  }
}
