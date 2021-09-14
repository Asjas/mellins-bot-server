-- DropForeignKey
ALTER TABLE "UserBotTime" DROP CONSTRAINT "UserBotTime_telegramId_fkey";

-- DropForeignKey
ALTER TABLE "UserChannelTime" DROP CONSTRAINT "UserChannelTime_telegramId_fkey";

-- AddForeignKey
ALTER TABLE "UserBotTime" ADD CONSTRAINT "UserBotTime_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "TelegramUser"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChannelTime" ADD CONSTRAINT "UserChannelTime_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "TelegramUser"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "TelegramUser.botSessionId_unique" RENAME TO "TelegramUser_botSessionId_key";

-- RenameIndex
ALTER INDEX "TelegramUser.channelSessionId_unique" RENAME TO "TelegramUser_channelSessionId_key";

-- RenameIndex
ALTER INDEX "TelegramUser.rsaId_unique" RENAME TO "TelegramUser_rsaId_key";

-- RenameIndex
ALTER INDEX "TelegramUser.username_unique" RENAME TO "TelegramUser_username_key";

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";

-- RenameIndex
ALTER INDEX "UserBotTime.sessionId_unique" RENAME TO "UserBotTime_sessionId_key";

-- RenameIndex
ALTER INDEX "UserChannelTime.sessionId_unique" RENAME TO "UserChannelTime_sessionId_key";
