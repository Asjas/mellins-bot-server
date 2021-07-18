import { telegramDb } from "../db/telegram";

export async function sendUserCommand() {
  await telegramDb.telegramMessages.update();
}

export async function sendBotCommand() {
  await telegramDb.telegramMessages.update();
}
