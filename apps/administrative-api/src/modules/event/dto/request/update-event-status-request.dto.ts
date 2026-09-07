import { IsEnum, IsNotEmpty } from "class-validator";
import { EventStatusEnum } from "libs/shared/src";

export class UpdateEventStatusRequestDTO {
  @IsNotEmpty()
  @IsEnum(EventStatusEnum)
  status: EventStatusEnum;
}
