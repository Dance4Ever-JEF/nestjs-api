import { EventStatusEnum } from "libs/shared/src";

export type FindManyEventsOutputDTO = {
  events: EventOutputDTO[];
  totalCount: number;
};

export type EventOutputDTO = {
  id: number;
  title: string;
  description: string | null;
  date: Date;
  location: string;
  capacity: number;
  price: number;
  status: EventStatusEnum;
};
