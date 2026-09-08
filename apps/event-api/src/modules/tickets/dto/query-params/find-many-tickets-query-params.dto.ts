import { IsOptional, IsInt, Min } from "class-validator";
import { Type } from "class-transformer";

export class FindManyTicketsQueryParamsDTO {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  eventId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  skip?: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  take?: number = 10;
}
