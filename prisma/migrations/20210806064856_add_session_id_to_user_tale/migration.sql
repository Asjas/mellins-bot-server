/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `TelegramUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sessionId` to the `TelegramUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TelegramUser" ADD COLUMN     "sessionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TelegramUser.sessionId_unique" ON "TelegramUser"("sessionId");
