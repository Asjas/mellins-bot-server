-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TelegramUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "rsaId" TEXT NOT NULL,
    "userTelegramId" INTEGER NOT NULL,
    "userJoinedChannel" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_TelegramUser" ("createdAt", "firstName", "id", "lastName", "rsaId", "updatedAt", "userTelegramId") SELECT "createdAt", "firstName", "id", "lastName", "rsaId", "updatedAt", "userTelegramId" FROM "TelegramUser";
DROP TABLE "TelegramUser";
ALTER TABLE "new_TelegramUser" RENAME TO "TelegramUser";
CREATE UNIQUE INDEX "TelegramUser.rsaId_unique" ON "TelegramUser"("rsaId");
CREATE UNIQUE INDEX "TelegramUser.userTelegramId_unique" ON "TelegramUser"("userTelegramId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
