-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('DRAFT', 'SALE_OPEN', 'SALE_CLOSED', 'FINISHED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'DRAFT';
