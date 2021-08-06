/*
  Warnings:

  - You are about to drop the column `sessionId` on the `TelegramUser` table. All the data in the column will be lost.
  - The primary key for the `UserBotTime` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `UserBotTime` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sessionId]` on the table `UserBotTime` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sessionId` to the `UserBotTime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telegramId` to the `UserBotTime` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserBotTime" DROP CONSTRAINT "UserBotTime_userId_fkey";

-- DropIndex
DROP INDEX "TelegramUser.sessionId_unique";

-- AlterTable
ALTER TABLE "TelegramUser" DROP COLUMN "sessionId";

-- AlterTable
ALTER TABLE "UserBotTime" DROP CONSTRAINT "UserBotTime_pkey",
DROP COLUMN "userId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "sessionId" TEXT NOT NULL,
ADD COLUMN     "telegramId" INTEGER NOT NULL,
ADD PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserBotTime.sessionId_unique" ON "UserBotTime"("sessionId");

-- AddForeignKey
ALTER TABLE "UserBotTime" ADD FOREIGN KEY ("telegramId") REFERENCES "TelegramUser"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;
