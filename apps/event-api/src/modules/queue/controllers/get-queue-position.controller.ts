import { Controller, Get, Param } from "@nestjs/common";
import { GetQueuePositionService } from "../services/get-queue-position.service";
import { GetQueuePositionOutputDTO, GetQueuePositionRouteParamsDTO } from "../dto";

@Controller()
export class GetQueuePositionController{
  constructor(
    private readonly getQueuePositionService: GetQueuePositionService
  ){}

  @Get(":queueId")
  public async handle(
    @Param()
    params: GetQueuePositionRouteParamsDTO
  ): Promise<GetQueuePositionOutputDTO>{
    return this.getQueuePositionService.execute(
      params
    );
  }
}
