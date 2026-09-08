export type BuyTicketsInputDTO = {
  queueId: string,
  userId: number,
  tickets: TicketInputDTO[] 
}

type TicketInputDTO = {
  cpf: string,
  isHalfPrice?: boolean, 
}
