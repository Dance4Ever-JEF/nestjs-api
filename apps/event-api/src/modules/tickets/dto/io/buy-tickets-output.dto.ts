export class TicketOutputDTO {
  id: number;
  eventId: number;
  buyerId: number;
  cpf: string;
  halfPrice: boolean;
  used: boolean;
  createdAt: Date;
}

export class BuyTicketsOutputDTO {
  tickets: TicketOutputDTO[];
}
