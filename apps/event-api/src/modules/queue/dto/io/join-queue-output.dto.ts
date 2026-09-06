import { QueueStatusEnum } from "libs/shared/src/enums/queue-status.enum"

export type JoinQueueOutputDTO = {
  queueId: string,
  eventId: number,
  status: QueueStatusEnum
}
