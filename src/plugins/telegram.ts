import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";

import telegramBot from "../bot/telegram";
import { Config } from "../config";

function telegram(fastify: FastifyInstance, options, next) {
  const bot = options.bot;
  fastify.post(options.path, (request, reply) => {
    bot.handleUpdate(request.body, reply.raw);
  });

  next();
}

async function TelegramPlugin(fastify: FastifyInstance, opts: Config) {
  const bot = await telegramBot(opts.TELEGRAM_BOT_TOKEN);
  const SECRET_PATH = `/telegraf/${bot.secretPathComponent()}`;

  await fastify.register(telegram, { bot, path: SECRET_PATH });
}

export default fp(TelegramPlugin);
