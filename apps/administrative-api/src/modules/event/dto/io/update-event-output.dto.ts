import { EventStatusEnum } from "libs/shared/src"

export type UpdateEventOutputDTO = {
  id: number,
  title: string,
  description: string | null,
  date: Date,
  location: string,
  capacity: number,
  price: number,
  status: EventStatusEnum,
  createdAt: Date,
  updatedAt: Date
}
