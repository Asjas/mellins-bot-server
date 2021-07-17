-- CreateTable
CREATE TABLE "TelegramUser" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "rsaId" TEXT NOT NULL,
    "userTelegramId" INTEGER NOT NULL,
    "userJoinedChannel" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TelegramMessages" (
    "id" SERIAL NOT NULL,
    "userMessage" TEXT NOT NULL,
    "botAnswer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "telegramUserId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TelegramUser.rsaId_unique" ON "TelegramUser"("rsaId");

-- CreateIndex
CREATE UNIQUE INDEX "TelegramUser.userTelegramId_unique" ON "TelegramUser"("userTelegramId");

-- CreateIndex
CREATE UNIQUE INDEX "TelegramMessages.telegramUserId_unique" ON "TelegramMessages"("telegramUserId");

-- AddForeignKey
ALTER TABLE "TelegramMessages" ADD FOREIGN KEY ("telegramUserId") REFERENCES "TelegramUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
