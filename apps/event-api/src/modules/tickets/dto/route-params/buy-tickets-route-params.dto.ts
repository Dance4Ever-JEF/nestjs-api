import { IsNotEmpty, IsString } from "class-validator";

export class BuyTicketsRouteParamsDTO{
  @IsNotEmpty()
  @IsString()
  queueId: string;
}
