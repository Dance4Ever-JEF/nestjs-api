import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class UpdateEventStatusRouteParamsDTO {
  @Type(() => Number)
  @IsInt()
  id: number;
}
