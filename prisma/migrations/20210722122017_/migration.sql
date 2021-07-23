/*
  Warnings:

  - You are about to drop the `UserBotStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserBotStatus" DROP CONSTRAINT "UserBotStatus_telegramUserId_fkey";

-- DropTable
DROP TABLE "UserBotStatus";
