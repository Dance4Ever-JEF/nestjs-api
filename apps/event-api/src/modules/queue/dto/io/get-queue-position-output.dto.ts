import { QueueStatusEnum } from "libs/shared/src/enums/queue-status.enum"

export type GetQueuePositionOutputDTO = {
  queueId: string,
  eventId: number,
  status: QueueStatusEnum,
  position: number | null,
  admissionToken?: string
}
