import { EventStatusEnum } from "libs/shared/src";

export type UpdateEventStatusInputDTO = {
  eventId: number;
  status: EventStatusEnum;
}
