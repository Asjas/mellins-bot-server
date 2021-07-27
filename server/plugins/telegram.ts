import { FastifyInstance } from "fastify";
import FastifyTelegraf from "fastify-telegraf";
import telegramBot from "../bots/telegram";

export default async function Telegram(fastify: FastifyInstance, opts) {
  const bot = await telegramBot(opts.TELEGRAM_BOT_TOKEN);
  const SECRET_PATH = `/telegraf/${bot.secretPathComponent()}`;

  await fastify.register(FastifyTelegraf, { bot, path: SECRET_PATH });
}
