import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class FindManyEventsQueryParamsDTO{
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  skip: number = 0;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(20)
  take: number = 6;
}
