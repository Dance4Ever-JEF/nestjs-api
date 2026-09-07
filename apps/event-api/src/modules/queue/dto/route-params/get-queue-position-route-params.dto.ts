import { IsNotEmpty, IsString } from "class-validator";

export class GetQueuePositionRouteParamsDTO{
  @IsNotEmpty()
  @IsString()
  queueId: string;
}
