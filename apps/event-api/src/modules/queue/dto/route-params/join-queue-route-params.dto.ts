import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, Min } from "class-validator";

export class JoinQueueRouteParamsDTO{
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  eventId: number;
}
