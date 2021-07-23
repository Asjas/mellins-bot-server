/*
  Warnings:

  - A unique constraint covering the columns `[telegramUserId]` on the table `UserBotStatus` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserBotStatus.telegramUserId_unique" ON "UserBotStatus"("telegramUserId");
