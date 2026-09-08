export class TicketEventOutputDTO {
  id: number;
  title: string;
  description: string | null;
  date: Date;
  location: string;
  status: string;
}

export class TicketWithEventOutputDTO {
  id: number;
  cpf: string;
  halfPrice: boolean;
  used: boolean;
  createdAt: Date;
  event: TicketEventOutputDTO;
}

export class FindManyTicketsOutputDTO {
  tickets: TicketWithEventOutputDTO[];
  total: number;
}
