import { Type } from "class-transformer";
import { IsNumber, Min } from "class-validator";

export class FindEventByIdRouteParamsDTO{
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  id: number
}
