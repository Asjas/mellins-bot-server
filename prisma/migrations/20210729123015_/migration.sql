/*
  Warnings:

  - A unique constraint covering the columns `[telegramUserId]` on the table `TimeOnBot` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sessionId]` on the table `TimeOnBot` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "TimeOnBot" ALTER COLUMN "stoppedAt" DROP NOT NULL,
ALTER COLUMN "stoppedAt" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "TimeOnBot.telegramUserId_unique" ON "TimeOnBot"("telegramUserId");

-- CreateIndex
CREATE UNIQUE INDEX "TimeOnBot.sessionId_unique" ON "TimeOnBot"("sessionId");
