import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";

@Processor("ticket-queue")
export class TicketQueueProcessor extends WorkerHost{
  async process(job: Job): Promise<any> {
      
  }

}
