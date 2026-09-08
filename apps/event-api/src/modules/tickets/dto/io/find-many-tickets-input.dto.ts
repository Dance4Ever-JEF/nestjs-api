export type FindManyTicketsInputDTO = {
  userId: number;
  eventId?: number;
  skip?: number;
  take?: number;
};
