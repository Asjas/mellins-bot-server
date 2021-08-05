-- CreateTable
CREATE TABLE "TelegramUser" (
    "telegramId" INTEGER NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "rsaId" TEXT,
    "username" TEXT NOT NULL,
    "joinedMellinsChannel" BOOLEAN DEFAULT false,
    "kickedBot" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("telegramId")
);

-- CreateIndex
CREATE UNIQUE INDEX "TelegramUser.rsaId_unique" ON "TelegramUser"("rsaId");

-- CreateIndex
CREATE UNIQUE INDEX "TelegramUser.username_unique" ON "TelegramUser"("username");
