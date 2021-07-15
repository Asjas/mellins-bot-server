import TelegrafPKG from "telegraf";
import registerBotCommands from "../commands";
import botMiddleware from "../middleware/botMiddleware";

const { Telegraf } = TelegrafPKG;

async function mellinsBot(TELEGRAM_BOT_TOKEN: string) {
  const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

  botMiddleware(bot);

  registerBotCommands(bot);

  await bot.launch();

  return bot;
}

export default mellinsBot;
