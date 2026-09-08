import { Type } from "class-transformer";
import {
  IsDate,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class UpdateEventRequestDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  capacity?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  price?: number;
}
