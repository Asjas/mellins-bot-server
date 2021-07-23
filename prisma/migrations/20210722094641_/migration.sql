-- CreateTable
CREATE TABLE "TelegramUser" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "rsaId" TEXT,
    "telegramId" INTEGER,
    "joinedMellinsChannel" BOOLEAN DEFAULT false,
    "kickedBot" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TelegramMessages" (
    "id" SERIAL NOT NULL,
    "messageId" INTEGER NOT NULL,
    "userCommand" TEXT NOT NULL,
    "botAnswer" TEXT NOT NULL,
    "telegramUserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TelegramUser.rsaId_unique" ON "TelegramUser"("rsaId");

-- CreateIndex
CREATE UNIQUE INDEX "TelegramUser.telegramId_unique" ON "TelegramUser"("telegramId");

-- AddForeignKey
ALTER TABLE "TelegramMessages" ADD FOREIGN KEY ("telegramUserId") REFERENCES "TelegramUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
