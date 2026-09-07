import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { ProcessQueueService } from "../services/process-queue.service";
import { ExpireAdmittedService } from "../services/expire-admitted.service";

@Processor("ticket-queue")
export class TicketQueueProcessor extends WorkerHost {
  constructor(
    private readonly processQueueService: ProcessQueueService,
    private readonly expireAdmittedService: ExpireAdmittedService,
  ) {
    super();
  }

  async process(job: Job): Promise<void> {
    switch (job.name) {
      case "process-queue":
        await this.processQueueService.execute(job.data);
        break;

      case "expire-admitted":
        await this.expireAdmittedService.execute(job.data);
        break;
    }
  }
}
