import { QueueStatusEnum } from "libs/shared/src/enums/queue-status.enum"

export type GetQueueStatusOutputDTO = {
  queueId: string,
  eventId: number,
  status: QueueStatusEnum,
  position: number,
  admissionToken?: string
}
