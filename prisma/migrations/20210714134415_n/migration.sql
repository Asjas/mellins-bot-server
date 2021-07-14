-- CreateTable
CREATE TABLE "TelegramUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "rsaId" TEXT NOT NULL,
    "userTelegramId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "TelegramMessages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userMessage" TEXT NOT NULL,
    "botAnswer" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "telegramUserId" INTEGER NOT NULL,
    FOREIGN KEY ("telegramUserId") REFERENCES "TelegramUser" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "TelegramUser.rsaId_unique" ON "TelegramUser"("rsaId");

-- CreateIndex
CREATE UNIQUE INDEX "TelegramUser.userTelegramId_unique" ON "TelegramUser"("userTelegramId");

-- CreateIndex
CREATE UNIQUE INDEX "TelegramMessages.telegramUserId_unique" ON "TelegramMessages"("telegramUserId");
