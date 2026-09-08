import { EventStatusEnum } from "libs/shared/src"

export type UpdateEventStatusOutputDTO = {
  id: number,
  title: string,
  status: EventStatusEnum,
  updatedAt: Date
}

