import TelegrafPKG from "telegraf";
import registerBotCommands from "./registerBotCommands";
import botMiddleware from "../middleware/botMiddleware";

import type MyContext from "../types/telegram";
import * as keyboards from "../messages/botKeyboards";

const { Telegraf } = TelegrafPKG;

async function mellinsBot(TELEGRAM_BOT_TOKEN: string) {
  const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

  botMiddleware(bot);

  registerBotCommands(bot);

  await bot.launch();

  return bot;
}

export default mellinsBot;
