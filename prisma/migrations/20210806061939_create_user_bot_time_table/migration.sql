-- CreateTable
CREATE TABLE "UserBotTime" (
    "userId" INTEGER NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leftAt" TIMESTAMP(3),

    PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "UserBotTime" ADD FOREIGN KEY ("userId") REFERENCES "TelegramUser"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;
