-- CreateTable
CREATE TABLE "TelegramUser" (
    "telegramId" INTEGER NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "rsaId" TEXT,
    "username" TEXT,
    "botSessionId" TEXT NOT NULL,
    "channelSessionId" TEXT NOT NULL,
    "joinedMellinsChannel" BOOLEAN DEFAULT false,
    "kickedBot" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("telegramId")
);

-- CreateTable
CREATE TABLE "UserBotTime" (
    "id" SERIAL NOT NULL,
    "telegramId" INTEGER NOT NULL,
    "sessionId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leftAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserChannelTime" (
    "id" SERIAL NOT NULL,
    "telegramId" INTEGER NOT NULL,
    "sessionId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leftAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TelegramUser.rsaId_unique" ON "TelegramUser"("rsaId");

-- CreateIndex
CREATE UNIQUE INDEX "TelegramUser.username_unique" ON "TelegramUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "TelegramUser.botSessionId_unique" ON "TelegramUser"("botSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "TelegramUser.channelSessionId_unique" ON "TelegramUser"("channelSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "UserBotTime.sessionId_unique" ON "UserBotTime"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "UserChannelTime.sessionId_unique" ON "UserChannelTime"("sessionId");

-- AddForeignKey
ALTER TABLE "UserBotTime" ADD FOREIGN KEY ("telegramId") REFERENCES "TelegramUser"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChannelTime" ADD FOREIGN KEY ("telegramId") REFERENCES "TelegramUser"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;
